//import "dotenv/config";
import "./db";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.listen(8080, () => console.log("✅  Server Ready!"));
