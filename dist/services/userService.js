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
exports.findUserByResetToken = exports.createNewUser = exports.findUserByEmail = void 0;
const userModel_1 = __importDefault(require("../../src/models/userModel"));
const sequelize_1 = require("sequelize");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findOne({ where: { email } });
});
exports.findUserByEmail = findUserByEmail;
const createNewUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    return yield userModel_1.default.create({ email, password });
});
exports.createNewUser = createNewUser;
const findUserByResetToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [sequelize_1.Op.gt]: new Date() },
            },
        });
        return user;
    }
    catch (error) {
        throw new Error("Error finding user by reset token.");
    }
});
exports.findUserByResetToken = findUserByResetToken;
