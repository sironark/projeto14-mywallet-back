import { db } from "../src/app.js";

export async function transactions(req, res){
    const {authorization} = req.headers;
    const {email} = req.body;
    
    const token = authorization?.replace("Bearer ","");
    //console.log(req.headers.authorization)
    try {
        const session = await db.collection("sessions").find({token});
        if (!session) return res.sendStatus(401);
        const transactions = await db.collection("inputs").find().toArray()
        res.send(transactions)

    } catch (error) {
        res.sendStatus(500)
    }
}
