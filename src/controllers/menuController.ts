import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Restaurant from '../models/restaurantModel';
import Dish from '../models/dish';
import Category from '../models/category';
import { ParamsDictionary } from 'express-serve-static-core';
import {
  findRestaurantById,
  findAllCategories,
  findMenusByRestaurantId,
} from '../services/menuService';

// Type definitions
// dto
interface QueryParams {
  page?: string;
  limit?: string;
}

interface Params extends ParamsDictionary {
  restaurantId: string;
}

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = findAllCategories();

    res.status(200).json({
      data: categories,
      message: 'Categories fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get menu by restaurantId
export const getMenu = async (
  req: Request<Params, any, any, QueryParams>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const restaurantId = req.params.restaurantId;
  console.log(restaurantId);

  const page = parseInt(req.query.page ?? '1', 10);
  const limit = parseInt(req.query.limit ?? '10', 10);
  const offset = (page - 1) * limit;

  try {
    const restaurant = findRestaurantById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Not found' });
    }

    const { menus, totalItems } = await findMenusByRestaurantId(
      restaurantId,
      page,
      limit
    );

    console.log(menus);

    const totalPages = Math.ceil(totalItems / limit);

    // Return the final response
    return res.status(200).json({
      page: page,
      totalPages: totalPages,
      totalItems: totalItems,
      menus: menus,
    });
  } catch (error) {
    next(error);
  }
};
