import {Router} from "express";
import {contObject} from './instance.js';

const userRouter = Router();

userRouter.get("/",(req,res)=>{
    res.send("Hello world");
})

userRouter.post("/issue",async(req,res)=>{
    const {ID,Name,Course,Grade,Date} = req.body;
    const txReceipt = await contObject.issue(ID,Name,Course,Grade,Date);
    console.log(txReceipt);
    if(txReceipt)
        res.status(201).json("Certificate created");
    else
        res.status(400).json("Invalid Request");

})

userRouter.get("/getCertificate/:id",async(req,res)=>{
    console.log(req.params.id);
    const result = await contObject.Certificates(req.params.id)
    if(result)
        res.status(200).json(result);
    else
        res.status(400).json("Invalid ID");
})

export default userRouter