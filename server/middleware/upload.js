import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

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

export const uploadAsset = multer({ storage: asset_storage });

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

export const uploadProfilePictures = multer({ storage: profile_pictures })