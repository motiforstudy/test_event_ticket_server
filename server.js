import express from "express";
import userRouter from "./routers/user.js";
import creatorRouter from "./routers/creator.js";
import usresTicketsBuyRouter from "./routers/users.js";

const app = express();
const port = 3000;
app.use(express.json())

app.use("/user", userRouter)
app.use("/creator", creatorRouter)
app.use("/users", usresTicketsBuyRouter)

app.listen(port, ()=>{
    console.log("the server is ready: ");
    console.log("the path:", "http://localhost:3000");
})