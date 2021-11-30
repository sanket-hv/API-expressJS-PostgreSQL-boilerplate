/* eslint-disable import/first */
import dotenv from "dotenv";
dotenv.config();
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
import config from "config";
import express from "express";

const PORT = config.get("port") as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("Server Started");
});
