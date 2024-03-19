import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import usersRouter from './routers/user';
import mongoose from 'mongoose';
import config from './config';
import { ActiveConnections, UserWS } from './types';
import Post from './models/Post';
import User from './models/User';

const app = express();
expressWs(app);

const port = 8000;
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
const router = express.Router();

const activeConnections: ActiveConnections = {};
router.ws('/posts', async (ws, _req, next) => {
  let userWS: UserWS | null = null;

  ws.on('message', async (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === 'LOGIN') {
      const token = data.payload;
      const user = (await User.findOne({ token }, '_id displayName avatar')) as UserWS;

      if (user) {
        userWS = user;
        activeConnections[user._id] = ws;

        const users = await User.find({ isActive: true }, '_id displayName avatar');

        const messages = await Post.find().populate('user', 'displayName avatar').limit(30);
        Object.values(activeConnections).forEach((connection) => {
          connection.send(JSON.stringify({ type: 'LAST_MESSAGES', payload: { users, messages } }));
        });
      }
    }

    if (data.type === 'NEW_MESSAGE') {
      const newMessage = new Post({
        text: data.payload.text,
        user: userWS,
      });
      await newMessage.save();

      const payload = { type: 'SEND_MESSAGE', payload: { message: newMessage } };
      Object.values(activeConnections).forEach((connection) => {
        connection.send(JSON.stringify(payload));
      });
    }
    if (data.type === 'DELETE_MESSAGE') {
      try {
        await Post.deleteOne({ _id: data.payload.text });
      } catch (e) {
        next(e);
      }
      const messages = await Post.find().populate('user', 'displayName avatar').limit(30);
      const payload = { type: 'SEND_WITHOUT_DELETED_MESSAGE', payload: { messages: messages } };
      Object.values(activeConnections).forEach((connection) => {
        connection.send(JSON.stringify(payload));
      });
    }
  });

  ws.on('close', () => {
    if (userWS) {
      delete activeConnections[userWS._id];
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
