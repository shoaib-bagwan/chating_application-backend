import express from "express";
import Message from "../Models/message.js";

const router = express.Router();


// ✅ Send message
router.post("/send-message", async (req, res) => {
    try {
        const { sender_id, receiver_id, message } = req.body;

        if (!sender_id || !receiver_id || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Create and save the message in MongoDB
        const newMessage = new Message({ sender_id, receiver_id, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
    } catch (error) {
        console.error("❌ Error sending message:", error);
        res.status(500).json({ success: false, message: "Error sending message", error });
    }
});


// ✅ Get all messages between two users
router.get("/messages/:sender_id/:receiver_id", async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.params;

        const messages = await Message.find({
            $or: [
                { sender_id, receiver_id },
                { sender_id: receiver_id, receiver_id: sender_id },
            ],
        }).sort({ createdAt: 1 }); // sort by time (ascending)

        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        res.status(500).json({ success: false, message: "Error fetching messages", error });
    }
});

export default router;
