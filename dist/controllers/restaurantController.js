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
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const restaurantService_1 = require("../services/restaurantService");
const getRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    console.log('userId : ' + userId);
    if (userId === undefined) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const restaurants = yield (0, restaurantService_1.findAllRestaurantsByUser)(userId);
        res.status(200).json(restaurants);
    }
    catch (error) {
        console.error('Error retrieving restaurants:', error);
        res.status(500).json({ error: 'Failed to retrieve restaurants' });
    }
});
exports.getRestaurants = getRestaurants;
const postCreateRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, location, status } = req.body;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    if (userId === undefined) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const existingRestaurant = yield restaurantModel_1.default.findOne({
            where: { name },
        });
        if (existingRestaurant) {
            res
                .status(400)
                .json({ error: 'Restaurant with this name already exists' });
            return;
        }
        const newRestaurant = yield restaurantModel_1.default.create({
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
        next(error);
    }
});
exports.postCreateRestaurant = postCreateRestaurant;
