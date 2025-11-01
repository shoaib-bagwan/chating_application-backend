import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    sender_id: { type: String ,required:true},
    receiver_id: { type: String ,required:true},
    message: { type: String ,required:true},
}, { timestamps: true });
export default mongoose.model("Messages", messageSchema);