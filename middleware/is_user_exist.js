import { promises as fs } from "fs";

export async function isUserNameExist(req, res, next){
    try{
        const getName = req.body;
        let data = await fs.readFile("./data/users.json")
        let changeToJson = JSON.parse(data);
        for (let user of changeToJson["users"]){
            if (user["username"] === getName["usernsme"]){
                return res.send("this name is already exist please try onther name")
            }
        }
        next()
    } catch (error){
        res.send("you have a problem with name:")
    }
}