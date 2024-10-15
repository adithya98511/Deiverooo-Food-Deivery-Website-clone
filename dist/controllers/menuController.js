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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = exports.getCategory = void 0;
const menuService_1 = require("../services/menuService");
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = (0, menuService_1.findAllCategories)();
        res.status(200).json({
            data: categories,
            message: 'Categories fetched successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategory = getCategory;
// Get menu by restaurantId
const getMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const restaurantId = req.params.restaurantId;
    console.log(restaurantId);
    const page = parseInt((_a = req.query.page) !== null && _a !== void 0 ? _a : '1', 10);
    const limit = parseInt((_b = req.query.limit) !== null && _b !== void 0 ? _b : '10', 10);
    const offset = (page - 1) * limit;
    try {
        const restaurant = (0, menuService_1.findRestaurantById)(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Not found' });
        }
        const { menus, totalItems } = yield (0, menuService_1.findMenusByRestaurantId)(restaurantId, page, limit);
        console.log(menus);
        const totalPages = Math.ceil(totalItems / limit);
        // Return the final response
        return res.status(200).json({
            page: page,
            totalPages: totalPages,
            totalItems: totalItems,
            menus: menus,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMenu = getMenu;
