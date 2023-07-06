
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { MongoClient } from "mongodb";
import Joi from "joi";
import { getParticipants, signUp } from "../controllers/sign-up.js";
import { login } from "../controllers/sign-in.js";
import { input } from "../controllers/input.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

export let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
mongoClient.connect()
 .then(() => db = mongoClient.db())
 .catch((err) => console.log(err.message))



//End points
app.post("/sing-up", signUp);
app.post("/login", login);
app.post('/input', input);

 const PORT=5000
 app.listen(PORT, () => console.log(`Servidor Quiz rodando na porta ${PORT}`));