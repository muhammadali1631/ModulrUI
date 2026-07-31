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

app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed" });
    }
})

app.get('/api/debug-env', (req, res) => {
    res.json({
        hasMongoUrl: !!process.env.MONGODB_URL,
        mongoUrlLength: process.env.MONGODB_URL ? process.env.MONGODB_URL.length : 0,
        nodeEnv: process.env.NODE_ENV
    })
})

app.get('/',(req, res)=>{
    res.json("Hello from server")
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/component', componentRouter)



if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server Started on Port ${PORT}`)
        connectDb()
    })
}

export default app;
