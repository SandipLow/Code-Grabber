const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const { uploadAsset, uploadProfilePictures } = require('../middleware/upload');
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfsAsset, gridfsAssetBucket;
let gfsProfilePic, gridfsProfilePicBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsAssetBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'assets' });
    gridfsProfilePicBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'profile pictures' });

    gfsAsset = Grid(conn.db, mongoose.mongo);
    gfsProfilePic = Grid(conn.db, mongoose.mongo);

    gfsAsset.collection('assets');
    gfsProfilePic.collection('profile pictures');
})


// ROUTE 1: add a Asset using POST: "/api/assets/addasset". Log in required...
router.post('/addasset', fetchUser, uploadAsset.single("file"), async (req, res)=>{
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `https://code-grabber.onrender.com/api/assets/getasset/${req.file.filename}`;
    res.send(imgUrl);
})

router.post('/uploadProfilePic', uploadProfilePictures.single("file"), async (req, res)=>{
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `https://code-grabber.onrender.com/api/assets/getprofilepic/${req.file.filename}`;
    res.send(imgUrl);
})

// ROUTE 2: add a Asset using GET: "/api/assets/getasset/:filename". no Log in required...
router.get("/getasset/:filename", async (req, res) => {
    try {
        const file = await gfsAsset.files.findOne({ filename: req.params.filename });

        if(!file) {
            res.status(404).send("not found");
            return;
        }

        // if(file.contentType === 'image/jpeg' || file.contentType ==='image/png' || file.contentType === 'image/webp') {

            const readStream = gridfsAssetBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        // }

        // else {
        //     res.send("Till now only image files you get...!")
        // }

    } catch (error) {
        console.log(error);
        res.send("not found");
    }
});

router.get("/getprofilepic/:filename", async (req, res) => {
    try {
        const file = await gfsProfilePic.files.findOne({ filename: req.params.filename });

        if(!file) {
            res.status(404).send("not found");
            return;
        }

        const readStream = gridfsProfilePicBucket.openDownloadStream(file._id);
        readStream.pipe(res);

    } catch (error) {
        console.log(error);
        res.send("not found");
    }
});

// ROUTE 3: add a Asset using DELETe: "/api/assets/deleteasset/:filename". Log in required...
router.delete("/deleteasset/:filename",fetchUser, async (req, res) => {
    try {
        await gfsAsset.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});



module.exports = router;