import express from 'express';
import authController from '../controller/auth.js';
import authMiddleware from '../middleware/auth.js';
const route = express.Router();

route.post('/signup', authController.Signup)
route.post('/login', authController.Login)
route.get('/profile', authMiddleware, authController.Profile)

export default route;