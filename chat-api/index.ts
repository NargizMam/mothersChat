import express from 'express';
import expressWs from "express-ws";
import cors from 'cors';
import usersRouter from "./routers/user";
import mongoose from "mongoose";
import config from "./config";

const app = express();


expressWs(app);
const port = 8000;
app.use(cors());
app.use(express.json());


app.use('/users', usersRouter);

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