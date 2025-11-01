import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/chating-application",{ });
        console.log("MongoDB connected successfully");
        const connection=mongoose.connection;
        console.log(`mongo connect to ${connection.name}`)
    }catch(e){
        console.error(" MongoDB Connection Failed:", err.message);
    }
}
export default connectDB;