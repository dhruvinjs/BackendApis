import dotenv from "dotenv"
import express from "express";
import { connectDb } from "./db/conDb.js";
import routers from "./routes/user-routes.js";
import { ApiError } from "./utils/ApiError.js";
import cookieParser from "cookie-parser";
const app=express()
dotenv.config({
    path:'./.env'
})

const port=process.env.PORT || 5000
// app.listen(port,()=>console.log(`Listening in ${port}`))

app.use(cookieParser()); 
app.use(express.json());
//connecting db
connectDb().
then(()=>{
    app.listen(port,()=>console.log(`Server running at ${port}`))
    
})
.catch(error=>console.log("Connection failed"))

app.use("/api/v1/expense",routers)