"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitUser = exports.enterUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const UserLogs_1 = __importDefault(require("../models/UserLogs"));
//학부모의 전화번호를 받아 id 반환
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phonenumber = req.query.phonenumber;
    const user = yield User_1.default.findOne({ phoneNumber: phonenumber });
    if (!Boolean(user) || user === null) {
        return res.status(400).json(); //존재하지 않는 유저
    }
    const log = yield UserLogs_1.default.findOne({ userId: user._id });
    if (!Boolean(log)) {
        yield UserLogs_1.default.create({ userId: user._id, logs: [] });
    }
    return res.status(200).json({ _id: user._id }); //유저 아이디 반환
});
exports.getUsers = getUsers;
const enterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const user = yield User_1.default.findOne({ _id });
    if (!Boolean(user) || user === null) {
        return res.status(400).json();
    }
    user.currentStatus = true;
    yield user.save();
    const userLogs = yield UserLogs_1.default.findOne({ userId: _id });
    userLogs.logs.push({ entering: true });
    yield userLogs.save();
    return res.status(200).json();
});
exports.enterUser = enterUser;
const exitUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const user = yield User_1.default.findOne({ _id });
    if (!Boolean(user) || user === null) {
        return res.status(400).json();
    }
    user.currentStatus = false;
    yield user.save();
    const userLogs = yield UserLogs_1.default.findOne({ userId: _id });
    userLogs.logs.push({ entering: false });
    yield userLogs.save();
    return res.status(200).json();
});
exports.exitUser = exitUser;
