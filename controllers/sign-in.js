import { schemaLogin } from "./schemas.js";
import bcrypt from "bcrypt";
import {db} from "../src/app.js"
import { v4 as uuid } from 'uuid';


export async function login(req, res){
    const {email, password} = req.body;

    const validation = schemaLogin.validate(req.body, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map(msgErr => msgErr.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection('users').findOne({ email });
        if(!user) return res.sendStatus(404);

        if(!bcrypt.compareSync(password, user.password)) return res.sendStatus(401);
        const token = uuid();
        await db.collection('sessions').insertOne({userId: user._id, token})
        
        const resUser = {email: user.email, name: user.name,token: token}
        res.send(resUser).sendStatus(200);

    } catch (error) {
        res.sendStatus(500)
    }
}

