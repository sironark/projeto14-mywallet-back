import { db } from "../src/app.js";

export async function transactions(req, res){
    const {authorization} = req.headers;
    const {email} = req.query;
    
    const token = authorization?.replace("Bearer ","");
    //console.log(req.headers.authorization)
    try {
        const session = await db.collection("sessions").find({token});
        if (!session) return res.sendStatus(401);
        const transactions = await db.collection("inputs").find({email}).toArray()
        res.send(transactions)

    } catch (error) {
        res.sendStatus(500)
    }
}
