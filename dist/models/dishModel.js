"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../util/db")); // Adjust the import path as necessary
const restaurantModel_1 = __importDefault(require("./restaurantModel")); // Adjust the import path as needed
const orderModel_1 = __importDefault(require("../models/orderModel")); // Adjust the import path as necessary
const orderDishesModel_1 = __importDefault(require("../models/orderDishesModel")); // Adjust the import path as necessary
const category_1 = __importDefault(require("./category")); // Adjust the import path as needed
// Define the Dish model
const Dish = db_1.default.define("dish", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: restaurantModel_1.default,
            key: "id",
        },
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: category_1.default,
            key: "id",
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
});
// Define relationships
Dish.belongsTo(restaurantModel_1.default, { foreignKey: "restaurantId" });
Dish.belongsTo(category_1.default, { foreignKey: "categoryId" });
Dish.belongsToMany(orderModel_1.default, { through: orderDishesModel_1.default, foreignKey: "dishId", otherKey: "orderId" });
exports.default = Dish;
