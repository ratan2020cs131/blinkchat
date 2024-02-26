import express from 'express';
import authRoute from '../routes/auth.js';
const app = express();


app.use('/auth', authRoute)


export default app;