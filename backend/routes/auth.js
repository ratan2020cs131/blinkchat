import express from 'express';
import authController from '../controller/auth.js';
const route = express.Router();

route.post('/signup', authController.Signup)
route.post('/login', authController.Login)

export default route;