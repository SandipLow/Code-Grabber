import { connect, set } from 'mongoose';
const mongoURI = process.env.MONGODB_URI;

// connceting to mogo db using the URI
const connectToMongo = async ()=>{
    set("strictQuery", false);
    
    connect(mongoURI)
}
export default connectToMongo;