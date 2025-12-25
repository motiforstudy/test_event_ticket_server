import { promises as fs } from "fs";

export async function isCorrectNameAndPassword(req, res, next){
    try{
        const getBody = req.body;
        let data = await fs.readFile("./data/users.json")
        let changeToJson = JSON.parse(data);
        for (let user of changeToJson["users"]){
            if ((user["username"] === getBody["username"]) && (user["password"] === getBody["password"])){      
                return next()
            }
        }
        res.send("the user name or the password is incorrect")
    } catch (error){
        res.send("you have a problem with name or password:")
    }
}