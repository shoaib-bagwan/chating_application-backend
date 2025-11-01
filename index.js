import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './Config/db.js';
import messageRouts from './Routs/messageRouts.js';
import userRouts from './Routs/userRouts.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/user", userRouts);
app.use("/api/chat", messageRouts);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// All socket logic 
io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`📥 User joined room: ${room}`);
    });

    socket.on("send_message", (data) => {
        console.log("💬 New message:", data);
        io.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});
app.get('/', (req, res) => {
    res.status(201).send("Api is Running")
});
const PORT=process.env.PORT
server.listen(PORT, () => {
    console.log("server is running on port ",PORT)
})