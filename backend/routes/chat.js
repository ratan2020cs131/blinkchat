import express from 'express';
import chatController from '../controller/chat.js'
const route = express.Router();

route.get('/room', chatController.chat)

export default route;