import { connect } from 'mongoose';
const mongoURI = process.env.MONGODB_URI;

// connceting to mogo db using the URI
const connectToMongo = async ()=>{
    connect(mongoURI)
}
export default connectToMongo;