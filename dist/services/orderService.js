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
exports.findMenuByPk = exports.createOrderDishes = exports.createNewOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const orderDishesModel_1 = __importDefault(require("../models/orderDishesModel"));
const dish_1 = __importDefault(require("../models/dish"));
const createNewOrder = (_a, p0_1) => __awaiter(void 0, [_a, p0_1], void 0, function* ({ userId, restaurantId, totalPrice }, p0) {
    const newOrder = yield order_1.default.create({ userId, restaurantId, totalPrice }, p0);
    return newOrder;
});
exports.createNewOrder = createNewOrder;
// export const bulkCreateOD = async (orderDishData: Partial<IOrderDishes>[], p0?: { transaction: Transaction }) => {
//   return await OrderDishes.bulkCreate(orderDishData);
// };
const createOrderDishes = (_a) => __awaiter(void 0, [_a], void 0, function* ({ orderId, dishId, quantity, }) {
    return orderDishesModel_1.default.create({
        orderId: orderId,
        dishId: dishId,
        quantity: quantity,
    });
});
exports.createOrderDishes = createOrderDishes;
const findMenuByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return dish_1.default.findByPk(id);
    }
    catch (error) {
        throw new Error("Error finding user by reset token.");
    }
});
exports.findMenuByPk = findMenuByPk;
