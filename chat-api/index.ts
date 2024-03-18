import express from 'express';
import expressWs from "express-ws";
import cors from 'cors';
import usersRouter from "./routers/user";
import mongoose from "mongoose";
import config from "./config";
import {ActiveConnections, PostMutation} from "./types";
import Post from './models/Post';
import User from "./models/User";


const app = express();
expressWs(app);

const port = 8000;
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
const router = express.Router();

const activeConnections: ActiveConnections = {};
const sentPosts: PostMutation[] = [];
router.ws('/posts', async (ws, req) => {
    let userId: string | null = null;

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message.toString());
            console.log(data)
            if (!userId && data.type === 'LOGIN' && data.payload) {
                const token = data.payload;
                const user = await User.findOne({ token });
                if (user) {
                    userId = user._id.toString();
                    activeConnections[userId] = ws;
                } else {
                    throw new Error('Неверный токен пользователя');
                }

                ws.send(JSON.stringify({ type: 'WELCOME', payload:  {
                    user: 'Moderator', text: `${user.displayName}, добро пожаловать в чат!`
                    }}));

                const messages = await Post.find().populate('user', 'displayName avatar')
                    .sort({ createdAt: -1 })
                    .limit(30);
                console.log(messages)
                ws.send(JSON.stringify({ type: 'LAST_MESSAGES', payload: messages }));
            } else if (userId && data.type === 'NEW_MESSAGE') {
                const newMessage = new Post({
                    text: data.payload.text,
                    user: userId,
                });
                await newMessage.save();

                const payload = { type: 'NEW_MESSAGE', payload: newMessage };
                console.log(newMessage)
                Object.values(activeConnections).forEach((connection) => {
                    connection.send(JSON.stringify(payload));
                });
            }
        } catch (error) {
            console.error('Ошибка обработки сообщения:', error);
        }
    });

    ws.on('close', () => {
        if (userId) {
            delete activeConnections[userId];
        }
    });
});
app.use(router);
const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();