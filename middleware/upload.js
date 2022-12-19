const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const asset_storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: "assets",
            filename: `${Date.now()}-code_grabber-${file.originalname}`,
        };
    },
});

const uploadAsset = multer({ storage: asset_storage });

const profile_pictures = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file)=> {
        return {
            bucketName: "profile pictures",
            filename: `${Date.now()}-code_grabber-${file.originalname}`,
        }
    }
})

const uploadProfilePictures = multer({ storage: profile_pictures })

module.exports = { uploadAsset, uploadProfilePictures }