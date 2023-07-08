import { schemaSignUp } from "./schemas.js";
import bcrypt from "bcrypt";
import {db} from "../src/app.js"

export async function signUp(req, res){
    const {name, email, password} = req.body;

    const validation = schemaSignUp.validate(req.body, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map(msgErr => msgErr.message);
        return res.status(422).send(errors);
    }

    try {
        const userCreated = await db.collection("users").findOne({name});
        if(userCreated) return res.status(409).send("Nome já cadastrado");
        
        const passwordHash = bcrypt.hashSync(password, 10);
        await db.collection("users").insertOne({name, email, password: passwordHash})
        res.sendStatus(201)

    } catch (error) {
        res.send(error)
    }
}
