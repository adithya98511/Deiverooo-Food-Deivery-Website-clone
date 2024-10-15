"use strict";
// import { IOrder } from "../types/d/modelInterfaces";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
// import Dish from "../models/dishModel";
// import OrderDishes from "../models/orderDishesModel";
// import Restaurant from "../models/restaurantModel";
// import User from "../models/userModel";
// @Table({ tableName: "orders", timestamps: true })
// class Order extends Model<IOrder> {
//   @PrimaryKey
//   @AutoIncrement
//   @Column(DataType.INTEGER)
//   id!: number;
//   @Column({
//     type: DataType.FLOAT,
//     allowNull: false,
//   })
//   totalPrice!: number;
//   @Column({
//     type: DataType.ENUM("pending", "completed", "canceled"),
//     allowNull: false,
//     defaultValue: "pending",
//   })
//   status!: "pending" | "completed" | "canceled";
//   @ForeignKey(() => User)
//   @Column(DataType.INTEGER)
//   userId!: number;
//   @BelongsTo(() => User)
//   user!: User;
//   @ForeignKey(() => Restaurant)
//   @Column(DataType.INTEGER)
//   restaurantId!: number;
//   @BelongsTo(() => Restaurant)
//   restaurant!: Restaurant;
//   @BelongsToMany(() => Dish, {
//     through: () => OrderDishes,
//     foreignKey: "orderId",
//     otherKey: "dishId",
//   })
//   dishes!: Dish[];
// }
// export default Order;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../util/db"));
const dishModel_1 = __importDefault(require("../models/dishModel"));
const orderDishesModel_1 = __importDefault(require("../models/orderDishesModel"));
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const enum_1 = require("../types/d/enum");
const Order = db_1.default.define("order", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.OrderStatus),
        allowNull: false,
        defaultValue: "pending",
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: "id",
        },
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: restaurantModel_1.default,
            key: "id",
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
});
// Define relationships
Order.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
Order.belongsTo(restaurantModel_1.default, { foreignKey: "restaurantId", as: "restaurant" });
Order.belongsToMany(dishModel_1.default, { through: orderDishesModel_1.default, foreignKey: "orderId", otherKey: "dishId" });
exports.default = Order;
