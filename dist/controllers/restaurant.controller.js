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
exports.postCreateRestaurant = exports.getRestaurants = void 0;
const sequelize_1 = require("sequelize");
const restaurant_1 = __importDefault(require("../models/restaurant"));
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    if (userId === undefined) {
        res.status(401).json({ error: 'Unauthorized' });
        return; // Stop further execution if userId is undefined
    }
    try {
        const restaurants = yield restaurant_1.default.findAll({
            where: {
                userId: userId,
                status: {
                    [sequelize_1.Op.not]: 'deleted',
                },
            },
        });
        res.status(200).json(restaurants);
    }
    catch (error) {
        console.error('Error retrieving restaurants:', error);
        res.status(500).json({ error: 'Failed to retrieve restaurants' });
    }
});
exports.getRestaurants = getRestaurants;
const postCreateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, location, status } = req.body;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    if (userId === undefined) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const existingRestaurant = yield restaurant_1.default.findOne({
            where: { name }, // Adjust query if necessary
        });
        if (existingRestaurant) {
            res.status(400).json({ error: 'Restaurant with this name already exists' });
            return; // Stop further execution if restaurant already exists
        }
        const newRestaurant = yield restaurant_1.default.create({
            name,
            location,
            status,
            userId: userId,
        });
        res.status(201).json({
            message: 'Restaurant created successfully',
            restaurant: newRestaurant,
        });
    }
    catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});
exports.postCreateRestaurant = postCreateRestaurant;
