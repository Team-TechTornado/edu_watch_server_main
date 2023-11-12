"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://EDU-WATCH-DBA:vQ0ykWEfn7Vh4gM7@maindb.zpfumcv.mongodb.net/?retryWrites=true&w=majority", { dbName: "main" });
const db = mongoose_1.default.connection;
const handleOpen = () => console.log("✅  Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`);
db.once("open", handleOpen);
db.on("error", handleError);
