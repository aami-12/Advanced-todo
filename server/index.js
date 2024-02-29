import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";
dotenv.config();
const app = express();

app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], 
    methods: ["GET", "POST", "PUT","PATCH","DELETE"],
    credentials: true, //through this we can cookie or any other detaisl from backend to frontend
    // allowedHeaders: ['Content-Type'],
    // exposedHeaders: ['Content-Type']
  })
);
// app.use(cors());
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch(err => console.log(err));

 