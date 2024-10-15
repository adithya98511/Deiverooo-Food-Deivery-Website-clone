import Category from "../models/category"; // Adjust based on actual structure

import Restaurant from "../models/restaurantModel";
import Dish, { IDish } from "../models/dish";

export const findAllCategories = async () => {
  return await Category.findAll();
};

// find one restaurant by its id
export const findRestaurantById = async (restaurantId: string) => {
  return await Restaurant.findOne({
    where: {
      id: restaurantId,
    },
  });
};

export const findMenusByRestaurantId = async (
  restaurantId: string,
  limit: number,
  offset: number
): Promise<{ menus: IDish[]; totalItems: number }> => {
  const { rows, count } = await Dish.findAndCountAll({
    where: {
      restaurantId: restaurantId,
    },
    include: [
      {
        model: Category,
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
};
