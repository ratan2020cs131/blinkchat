import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'
import { Server } from 'socket.io';
dotenv.config({ path: './.env' })
import './database/connect.js';
import routes from './routes/index.js';


const app = express();
const server = http.createServer(app);


app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));
app.use(cors({ origin: "*", credentials: "*" }));

//socket.io
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('join-room', (room) => {
        socket.join(room)
    })
    socket.on('send-message', (message, id, name, room) => {
        console.log(message, room);
        socket.to(room).emit('recieve-message', message, id, name)
    })
})

//api endpoints
app.use('/api', routes);

//server starting
server.listen(process.env.PORT, () => {
    console.log("Server running on PORT", process.env.PORT);
});