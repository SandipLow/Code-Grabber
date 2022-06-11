const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const upload = require('../middleware/upload');
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
})


// ROUTE 1: add a Asset using POST: "/api/assets/addasset". Log in required...
router.post('/addasset', fetchUser, upload.single("file"), async (req, res)=>{
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `https://code-grabber.herokuapp.com/api/assets/getasset/${req.file.filename}`;
    res.send(imgUrl);
})
// router.post('/addasset', fetchUser, async (req, res)=>{
//     res.send("success");
// })



// ROUTE 2: add a Asset using GET: "/api/assets/getasset/:filename". no Log in required...
router.get("/getasset/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });

        if(!file) {
            res.status(404).send("not found");
            return;
        }

        // if(file.contentType === 'image/jpeg' || file.contentType ==='image/png' || file.contentType === 'image/webp') {

            const readStream = gridfsBucket.openDownloadStream(file._id);
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


// ROUTE 3: add a Asset using DELETe: "/api/assets/deleteasset/:filename". no Log in required...
router.delete("/deleteasset/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});





module.exports = router;