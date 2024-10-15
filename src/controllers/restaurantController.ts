import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import User from '../models/userModel';
import Restaurant from '../models/restaurantModel';
import { findAllRestaurantsByUser } from '../services/restaurantService';

interface CreateRestaurantBody {
  name: string;
  location: string;
  status: string;
}

interface RequestUser {
  id: number;
}

interface CustomRequest extends Request {
  user: { user: RequestUser };
}

export const getRestaurants = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.user?.id;
  console.log('userId : ' + userId);

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const restaurants = await findAllRestaurantsByUser(userId);

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error retrieving restaurants:', error);
    res.status(500).json({ error: 'Failed to retrieve restaurants' });
  }
};

export const postCreateRestaurant = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, location, status }: CreateRestaurantBody = req.body;

  const userId = req.user?.user?.id;

  if (userId === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const existingRestaurant = await Restaurant.findOne({
      where: { name },
    });

    if (existingRestaurant) {
      res
        .status(400)
        .json({ error: 'Restaurant with this name already exists' });
      return;
    }

    const newRestaurant = await Restaurant.create({
      name,
      location,
      status,
      userId: userId,
    });

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant,
    });
  } catch (error) {
    next(error);
  }
};
