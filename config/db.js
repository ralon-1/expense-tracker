import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Connected to MongoDB");
});

db.on("error", (err) => {
    console.log(err);
});

db.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

export default db;