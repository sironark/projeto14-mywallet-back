import { db } from "../src/app.js";

export async function transactions(req, res){
    const {authorization} = req.headers;
    const {email} = req.body;
    const token = authorization?.replace("Bearer ","");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.sendStatus(401);

        const transactions = await db.collection('inputs').find({email}).toArray()
        res.send(transactions)
    } catch (error) {
        res.send(error).sendStatus(500);
    }
}