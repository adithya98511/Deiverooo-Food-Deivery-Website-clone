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
exports.findMenusByRestaurantId = exports.findRestaurantById = exports.findAllCategories = void 0;
const category_1 = __importDefault(require("../models/category")); // Adjust based on actual structure
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const dish_1 = __importDefault(require("../models/dish"));
const findAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_1.default.findAll();
});
exports.findAllCategories = findAllCategories;
// find one restaurant by its id
const findRestaurantById = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield restaurantModel_1.default.findOne({
        where: {
            id: restaurantId,
        },
    });
});
exports.findRestaurantById = findRestaurantById;
const findMenusByRestaurantId = (restaurantId, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows, count } = yield dish_1.default.findAndCountAll({
        where: {
            restaurantId: restaurantId,
        },
        include: [
            {
                model: category_1.default,
                attributes: ["categoryName"],
            },
        ],
        limit: limit,
        offset: offset,
    });
    return {
        menus: rows,
        totalItems: count,
    };
});
exports.findMenusByRestaurantId = findMenusByRestaurantId;
