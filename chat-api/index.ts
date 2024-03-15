import express from 'express';
import expressWs from "express-ws";
import cors from 'cors';
import usersRouter from "./routers/user";

const app = express();

expressWs(app);

const port = 8000;
app.use(cors());
app.use('/users', usersRouter);




app.listen(port, () => {
    console.log(`Server started on ${port} port!`)
});