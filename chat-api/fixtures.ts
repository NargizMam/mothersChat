import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

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
  const collections = ['users', 'messages'];
  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }
  const [] = await User.create(
    {
      email: 'misha@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Major',
      avatar: 'fixtures/relaps.jpeg',
    },
    {
      email: 'anna@gmail.com',
      password: '0000',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Anna',
      avatar: 'fixtures/login.jpg',
    },
    {
      email: 'nin@gmail.com',
      password: '123',
      token: crypto.randomUUID(),
      role: 'moderator',
      displayName: 'Ninini',
      avatar: 'fixtures/myNik.jpg',
    },
  );
  await db.close();
};

void run();
