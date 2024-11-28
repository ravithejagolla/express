 
import express from "express";
import { router } from "./routers/courseRouter.js";
import logging from "./middlewares/loggingMiddleware.js";
import {read} from "../../controllers/courseController.js"
import cors from "cors"


const app = express();
app.use(express.json())
app.use(logging)
app.use(cors({origin: `http://localhost:5173`}))

app.use("/course",router)

app.listen(3000,()=>{
    console.log("server started on http://localhost:3000")
})