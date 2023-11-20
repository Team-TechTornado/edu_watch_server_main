import "dotenv/config";
import "./db";
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import prelaunchRouter from "./routers/prelaunchRouter";
import userRouter from "./routers/userRouter";
import communityRouter from "./routers/communityRouter";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));

app.use("/prelaunch", prelaunchRouter);
app.use("/users", userRouter);
app.use("/community", communityRouter);

app.listen(8080, "0.0.0.0", () => console.log("✅  Server Ready!"));
