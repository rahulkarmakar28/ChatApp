import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';


import { setupSocket } from './socket.js';
import authRoute from './routes/authRoute.js';
import contactsRoute from './routes/contactsRoute.js';
import messagesRoute from './routes/messagesRoute.js';
import channelsRoute from './routes/channelRoute.js';
import profileRoute from './routes/profileRoute.js';

import { dbConnect } from './config/DbConfig.js';
import { cloudinaryConnect } from './config/Cloudinary.js';



dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp", }));

dbConnect();
cloudinaryConnect();

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/contacts', contactsRoute);
app.use('/api/v1/messages', messagesRoute);
app.use('/api/v1/channels', channelsRoute);
app.use('/api/v1/profile', profileRoute);

app.get('/', (req, res) => {
    res.send(`This is Backend of Rahul's Chat App`);
});
app.get('/health', (req, res) => {
    res.json({ success: true, message: "Server is healthy", FRONTEND_URL: process.env.FRONTEND_URL });
});
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

setupSocket(server);