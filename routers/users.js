import express from "express";
import { promises as fs } from "fs";
import { isCorrectNameAndPassword } from "../middleware/is_correct_name_and_password.js";

const usresTicketsBuyRouter = express()

usresTicketsBuyRouter.post("/tickets/buy", isCorrectNameAndPassword, async (req, res)=>{
    try{
        let getBody = req.body  
        let data = await fs.readFile("./data/events.json")
        let changeToJson = JSON.parse(data);
        for (let event of changeToJson["events"]){
            if (event["eventName"] === getBody["eventName"]){        
                if (getBody["quantity"] > event["ticketForSale"]){
                    return res.send("ERROR: the number of tickets that you want to buy is more then what left");
                }
                event["ticketForSale"] -= getBody["quantity"];
                await fs.writeFile("./data/events.json", JSON.stringify(changeToJson))
                let details = {}
                details["username"] = getBody["username"]
                details["eventName"] = getBody["eventName"]
                details["ticketBoughy"] = getBody["quantity"]
                changeToJson["receipts"].push(details)
                await fs.writeFile("./data/receipts.json", JSON.stringify(details))
                return res.send({"message": "Tickets purchased successfully"})
            }
        }
        res.send({"message": "you have a problem in buy tickets"})
    } catch (error){
        res.send("you have a problem to buy tickets")
    }
})

usresTicketsBuyRouter.get("/:username/summary", async (req, res)=>{
    try{
        let getName = req.params
        let receiptsData = await fs.readFile("./data/receipts.json")     
        let changeToJsonReceiptsData = JSON.parse(receiptsData);
        let totalTicketsBought = 0
        let events = []
        for (let receipt of changeToJsonReceiptsData["receipts"]){
            if (receipt["username"] === getName["username"]){
                totalTicketsBought += receipt["ticketBoughy"]
                events.push(receipt["eventName"])
            }
        }
        if (events.length === 0){
            return res.send()
        }
        let averageTicketsPerEvent = totalTicketsBought / events.length
        res.send({
            "totalTicketsBought": totalTicketsBought,
            "events": events,
            "averageTicketsPerEvent": averageTicketsPerEvent
        })
    }catch (error){
        res.send("you have a problem to get summary")
    }
})

export default usresTicketsBuyRouter