import mongoose, { Error } from "mongoose";

mongoose.connect(
  "mongodb+srv://EDU-WATCH-DBA:vQ0ykWEfn7Vh4gM7@maindb.zpfumcv.mongodb.net/?retryWrites=true&w=majority",
  { dbName: "main" }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = (error: Error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
