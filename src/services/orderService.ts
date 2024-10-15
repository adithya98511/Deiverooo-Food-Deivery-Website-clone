import Order, { IOrder } from "../models/order";
import OrderDishes, { IOrderDishes } from "../models/orderDishesModel";
import Dish from "../models/dish";

import { Transaction } from "sequelize";

type NewOrderData = Pick<IOrder, "userId" | "restaurantId" | "totalPrice">;

export const createNewOrder = async ({ userId, restaurantId, totalPrice }: NewOrderData, p0?: { transaction: Transaction }) => {
  const newOrder = await Order.create({ userId, restaurantId, totalPrice }, p0);
  return newOrder;
};

// export const bulkCreateOD = async (orderDishData: Partial<IOrderDishes>[], p0?: { transaction: Transaction }) => {
//   return await OrderDishes.bulkCreate(orderDishData);
// };

export const createOrderDishes = async ({
  orderId,
  dishId,
  quantity,
}: {
  restaurantId: number;
  orderId: number;
  dishId: number;
  quantity: number;
}) => {
  return OrderDishes.create({
    orderId: orderId,
    dishId: dishId,
    quantity: quantity,
  });
};

export const findMenuByPk = async (id: number) => {
  try {
    return Dish.findByPk(id);
  } catch (error) {
    throw new Error("Error finding user by reset token.");
  }
};
