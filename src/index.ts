import express from "express";
import { scheduleTasks } from "#utils/scheduleTasks.ts";
import dotenv from "dotenv";
import db from '#config/dbConfig.ts';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Wildberries Data Service"));

app.listen(PORT, async () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  scheduleTasks();
});
