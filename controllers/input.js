import dayjs from "dayjs";
import {db} from "../src/app.js"
import { schemaTransaction } from "./schemas.js";

export async function input(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ","");
    const {value, discription, type, email} = req.body;

    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.sendStatus(401);

    const validation = schemaTransaction.validate({value, discription, type}, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map(msgErr => msgErr.message);
        return res.status(422).send(errors);
    }

    try {
        
        const inTransaction = {
            email,
            value,
            discription,
            time: dayjs().format('DD/MM'),
            type 
        }
        await db.collection("inputs").insertOne(inTransaction)
        res.send(inTransaction)
        
    } catch (error) {
        res.sendStatus(500)
    }
}