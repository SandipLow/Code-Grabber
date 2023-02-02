import Grid from "gridfs-stream";
import { connection, mongo } from "mongoose";
import connectToMongo from "./db";

export const assetBucket = async ()=> {
    await connectToMongo()

    const gridfsAssetBucket = new mongo.GridFSBucket(connection.db, { bucketName: 'assets' });
    const gfsAsset = Grid(connection.db, mongo);
    gfsAsset.collection('assets');

    return { gridfsAssetBucket, gfsAsset }
} 


export const profilePicBucket = async ()=> {
    await connectToMongo()

    const gridfsProfilePicBucket = new mongo.GridFSBucket(connection.db, { bucketName: 'profile pictures' });
    const gfsProfilePic = Grid(connection.db, mongo);
    gfsProfilePic.collection('profile pictures');

    return { gridfsProfilePicBucket, gfsProfilePic }
}

