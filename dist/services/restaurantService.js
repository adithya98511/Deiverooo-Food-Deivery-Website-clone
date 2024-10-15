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
exports.findAllRestaurantsByUser = void 0;
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const sequelize_1 = require("sequelize");
const findAllRestaurantsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurantModel_1.default.findAll({
            where: {
                userId: userId,
                status: {
                    [sequelize_1.Op.not]: "deleted",
                },
            },
        });
        return restaurants;
    }
    catch (error) {
        throw new Error("Error fetching restaurants");
    }
});
exports.findAllRestaurantsByUser = findAllRestaurantsByUser;
