import mongoose, { Error } from "mongoose";
require("dotenv").config();

mongoose.connect(process.env.MONGO_ADD as string, {
  dbName: "main",
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = (error: Error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
