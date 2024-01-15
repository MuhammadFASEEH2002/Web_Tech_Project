import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

import indexRoute from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('upload'));
app.use(cookieParser())
app.use("/", indexRoute);

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
