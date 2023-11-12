"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    _id: { type: mongodb_1.ObjectId, required: true },
    phoneNumber: { type: String, required: true },
    currentStatus: { type: Boolean, default: false },
});
UserSchema.index({ phoneNumber: 1 });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
