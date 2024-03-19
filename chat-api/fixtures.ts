import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from "./models/Post";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing. skipping drop ...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const collections = ['users', 'posts'];
  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  const [user1, user2] = await User.create(
    {
      email: 'misha@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Major',
      avatar: 'fixtures/relaps.jpeg',
      isActive: true
    },
    {
      email: 'anna@gmail.com',
      password: '0000',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Anna',
      avatar: 'fixtures/login.jpg',
      isActive: true
    },
    {
      email: 'nin@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'moderator',
      displayName: 'Ninini',
      avatar: 'fixtures/myNik.jpg',
      isActive: true
    },
  );
   await Post.create(
       {
         text: 'Hello',
         createdAt: new Date(),
         user: user1._id,
       },
       {
         text: 'Hiiiii',
         createdAt: new Date(),
         user: user1._id,
         },
       {
         text: 'Worked',
         createdAt: new Date(),
         user: user2._id

       },
       {
         text: 'Устала ужасно',
         createdAt: new Date(),
         user: user2._id,
       },
       {
         text: 'Евгений, большое спасибо!',
         createdAt: new Date(),
         user: user2._id,
       },

  )
      await db.close();
};

void run();
