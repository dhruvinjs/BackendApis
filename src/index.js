import dotenv from "dotenv"
import express from "express";
import { connectDb } from "./db/conDb.js";
import routers from "./routes/user-routes.js";
import { ApiError } from "./utils/ApiError.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors"
const app=express()

app.use(helmet()); 

app.use(helmet.noSniff())
// Prevent clickjacking by setting X-Frame-Options
app.use(helmet.frameguard({ action: 'deny' }));

app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "*"], // Allow content from any source
      scriptSrc: ["'self'", "*"],  // Allow scripts from any source
      styleSrc: ["'self'", "*"],   // Allow styles from any source
      imgSrc: ["'self'", "*"],     // Allow images from any source
      objectSrc: ["'none'"],       // No embedding of objects
      upgradeInsecureRequests: [], // Upgrade HTTP to HTTPS
    }
  }));
app.use(cors({
    origin: '*',  // Allow all origins
  }));
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

app.use("/api/v1",routers)