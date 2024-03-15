import express from "express";
import {ActiveConnections} from "../types";

const router = express.Router();

const activeConnections: ActiveConnections = {};