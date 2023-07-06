
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { MongoClient } from "mongodb";
import Joi from "joi";


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
mongoClient.connect()
 .then(() => db = mongoClient.db())
 .catch((err) => console.log(err.message))







 const PORT=5000
 app.listen(PORT, () => console.log(`Servidor Quiz rodando na porta ${PORT}`));