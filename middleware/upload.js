const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        // Checking the file image or not...... :
        const match = ["image/png", "image/jpeg", "image/webp"];

        // If not Image file the file would be saved in default bucket
        // It is for demonstration I've done to save both kinda files in same bucket : )
        if (match.indexOf(file.mimetype) === -1) {
            return {
                bucketName: "photos",
                filename: `${Date.now()}-code_grabber-${file.originalname}`,
            };
        }

        // If file is an Image then saved in "photos" bucket..... :
        return {
            bucketName: "photos",
            filename: `${Date.now()}-code_grabber-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });