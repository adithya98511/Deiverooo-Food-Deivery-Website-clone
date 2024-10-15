import Restaurant from "../models/restaurantModel";
import { Op } from "sequelize";

export const findAllRestaurantsByUser = async (userId: number) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: {
        userId: userId,
        status: {
          [Op.not]: "deleted",
        },
      },
    });

    return restaurants;
  } catch (error) {
    throw new Error("Error fetching restaurants");
  }
};
