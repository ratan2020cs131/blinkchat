import { io } from '../index.js';

const chat = async (req, res) => {
    try {
        io.on('connection', (socket) => {
            console.log(socket.id);
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error: ", err.message)
    }
}

export default {
    chat
}