"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dish_1 = __importDefault(require("./dish"));
const order_1 = __importDefault(require("./order"));
const orderDishesModel_1 = __importDefault(require("./orderDishesModel"));
const restaurantModel_1 = __importDefault(require("./restaurantModel"));
const userModel_1 = __importDefault(require("./userModel"));
const category_1 = __importDefault(require("./category"));
dish_1.default.belongsTo(restaurantModel_1.default, { foreignKey: 'restaurantId' });
dish_1.default.belongsTo(category_1.default, { foreignKey: 'categoryId' });
dish_1.default.belongsToMany(order_1.default, {
    through: orderDishesModel_1.default,
    foreignKey: 'dishId',
    otherKey: 'orderId',
});
orderDishesModel_1.default.belongsTo(order_1.default, { foreignKey: 'orderId' });
orderDishesModel_1.default.belongsTo(dish_1.default, { foreignKey: 'dishId' });
order_1.default.belongsTo(userModel_1.default, { foreignKey: 'userId', as: 'user' });
order_1.default.belongsTo(restaurantModel_1.default, { foreignKey: 'restaurantId', as: 'restaurant' });
order_1.default.belongsToMany(dish_1.default, {
    through: orderDishesModel_1.default,
    foreignKey: 'orderId',
    otherKey: 'dishId',
});
restaurantModel_1.default.belongsTo(userModel_1.default, { foreignKey: 'userId', as: 'user' });
restaurantModel_1.default.hasMany(dish_1.default, { foreignKey: 'restaurantId' });
restaurantModel_1.default.hasMany(order_1.default, { foreignKey: 'restaurantId' });
userModel_1.default.hasMany(restaurantModel_1.default, { foreignKey: 'userId' });
userModel_1.default.hasMany(order_1.default, { foreignKey: 'userId' });
