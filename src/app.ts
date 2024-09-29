// src/app.ts
import express from "express";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes";
import { AppDataSource } from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/images", imageRoutes);

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection error", error));

export default app;
