import express from "express";
import { promises as fs } from "fs";
import { isCorrectNameAndPassword } from "../middleware/is_correct_name_and_password.js";

const creatorRouter = express()

creatorRouter.post("/events", isCorrectNameAndPassword, async (req, res)=>{
    try{
        let getBody = req.body
        let data = await fs.readFile("./data/events.json")
        let changeToJson = JSON.parse(data);
        let details = {}
        details["eventName"] = getBody["eventName"]
        details["ticketForSale"] = getBody["ticketForSale"]
        details["username"] = getBody["username"]
        changeToJson["events"].push(details)
        await fs.writeFile("./data/events.json", JSON.stringify(changeToJson))
        res.send({"message": "Event created successfully"})
    } catch (error){
        res.send("you have a problem to creat event")
    }
})

export default creatorRouter