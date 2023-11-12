"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const LogSchema = new mongoose_1.default.Schema({
    time: { type: Date, default: Date.now },
    entering: { type: Boolean, required: true },
});
const UserLogSchema = new mongoose_1.default.Schema({
    userId: { type: mongodb_1.ObjectId, required: true, ref: "User" },
    logs: [LogSchema] || [],
});
LogSchema.index({ time: 1 });
UserLogSchema.index({ userid: 1 });
const UserLogs = mongoose_1.default.model("UserLogs", UserLogSchema);
exports.default = UserLogs;
