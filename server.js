import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';

import mongoose from "mongoose";

import qrCodeRoutes from "./app/routes/qrcodes.js";
import userRoutes from "./app/routes/users.js";

const app = express();
const CONNECTION_URL = "mongodb+srv://wdp:THzfTd8nGXeL2CR@merlin.zxfws.mongodb.net/qr?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("connected to database");

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})
.catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/api/v1/qr', qrCodeRoutes);
app.use('/api/v1/users', userRoutes);