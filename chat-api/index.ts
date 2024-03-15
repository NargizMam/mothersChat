import express from 'express';
import expressWs from "express-ws";
import cors from 'cors';
import {ActiveConnections, IncomingMessage} from "./types";

const app = express();

expressWs(app);

const port = 8000;
app.use(cors());

const router = express.Router();

const activeConnections: ActiveConnections = {};



app.listen(port, () => {
    console.log(`Server started on ${port} port!`)
});