import express from "express";
import connectdb from "./config/database.js";
import dotenv from "dotenv";
import authrouter from "./routes/authroute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();


app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true, 
      methods: ["GET", "POST"], 
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  

// Using Middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authrouter);

connectdb();

app.get("/", (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is working on Port ${PORT}`);
});
