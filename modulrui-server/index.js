import express from "express";
import dotenv from 'dotenv'
import { connectDb } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from 'cors'
import userRouter from "./routes/user.route.js";
import componentRouter from "./routes/component.route.js";
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://modulr-ui1.vercel.app',
    credentials: true
}))

app.get('/',(req, res)=>{
    res.json("Hello from server")
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/component', componentRouter)


await connectDb();
export default app;

