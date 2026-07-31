import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        isConnected = db.connections[0].readyState === 1;
        console.log("DB connected");
    } catch (error) {
        console.log("DB Error", error);
        throw error; // important: taake upar wale middleware ko pata chale connection fail hui
    }
};
