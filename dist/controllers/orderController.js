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
exports.placeOrder = void 0;
const orderDishesModel_1 = __importDefault(require("../models/orderDishesModel"));
const dish_1 = __importDefault(require("../models/dish"));
const orderService_1 = require("../services/orderService");
const db_1 = __importDefault(require("../util/db"));
const placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield db_1.default.transaction();
    try {
        const { menuItems, restaurantId, } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.id;
        if (!menuItems || menuItems.length === 0) {
            return res.status(400).json({ error: 'No menu items provided' });
        }
        // Create the order
        const newOrder = yield (0, orderService_1.createNewOrder)({ userId, restaurantId, totalPrice: 0 }, { transaction });
        // Collect all productIds to fetch dishes in a single query
        const productIds = menuItems.map((item) => item.productId);
        const dishes = yield dish_1.default.findAll({
            where: { id: productIds },
            transaction,
        });
        // If any menu item is missing
        if (dishes.length !== menuItems.length) {
            return res.status(404).json({ error: 'Some menu items not found' });
        }
        // Create order dishes in bulk
        const orderDishesData = menuItems.map((item) => {
            const dish = dishes.find((d) => d.id === item.productId);
            return {
                restaurantId: restaurantId,
                orderId: newOrder.id,
                dishId: dish === null || dish === void 0 ? void 0 : dish.id,
                quantity: item.quantity,
            };
        });
        yield orderDishesModel_1.default.bulkCreate(orderDishesData, { transaction });
        // Calculate total price
        const totalPrice = orderDishesData.reduce((acc, item) => {
            const dish = dishes.find((d) => d.id === item.dishId);
            return acc + dish.price * item.quantity;
        }, 0);
        // Update the order with total price
        newOrder.totalPrice = totalPrice;
        yield newOrder.save({ transaction });
        yield transaction.commit();
        return res
            .status(201)
            .json({ message: 'Order placed successfully', order: newOrder });
    }
    catch (error) {
        // Rollback transaction in case of any error
        yield transaction.rollback();
        next(error);
    }
});
exports.placeOrder = placeOrder;
