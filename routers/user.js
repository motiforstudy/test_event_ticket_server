import express from "express";
import { promises as fs } from "fs";
import { isUserNameExist } from "../middleware/is_user_exist.js";

const userRouter = express()

userRouter.post("/register", isUserNameExist, async (req, res)=>{
    try{
        let getBody = req.body
        let data = await fs.readFile("./data/users.json")
        let changeToJson = JSON.parse(data);
        changeToJson["users"].push(getBody)
        await fs.writeFile("./data/users.json", JSON.stringify(changeToJson))
        res.send({"message": "User registered successfully"})
    } catch (error){
        res.send("you have a problem to register")
    }
})

export default userRouter