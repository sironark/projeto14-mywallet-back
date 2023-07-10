
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { signUp } from "../controllers/sign-up.js";
import { login } from "../controllers/sign-in.js";
import { input } from "../controllers/input.js";
import { transactions } from "../controllers/transactions.js";

//Configuration app
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

//Conecting MongoDB
export let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
mongoClient.connect()
 .then(() => {
    db = mongoClient.db()
    console.log("-Mongo conected")
})
 .catch((err) => console.log(err.message))

//End points
app.post("/sing-up", signUp);
app.post("/login", login);
app.post("/input", input);
app.get("/transactions",transactions)

//Port connection
const port = process.env.PORT || 5000
 app.listen(port, () => console.log(`-Running server on port ${port}`));