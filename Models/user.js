import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    mobileNo: { type: String, required: true },
    contact:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
}, { timestamps: true });
export default mongoose.model("user", userSchema);