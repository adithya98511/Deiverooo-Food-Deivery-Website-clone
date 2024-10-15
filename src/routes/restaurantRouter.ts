// import { roleMiddleware } from "../middleware/role-middleware";
// import {authMiddleware} from "../middleware/auth-middleware";
// import {getRestaurants,postCreateRestaurant} from "../controllers/restaurantController"
// import { Router } from 'express';
// const router = Router();

// router.get(
//   '/getRestaurants',
//   authMiddleware,
//   roleMiddleware('admin'),
//   getRestaurants
// );
// router.post(
//   '/createRestaurant',
//   authMiddleware,
//   roleMiddleware('admin'),
//   postCreateRestaurant
// );

// export default router;

import { roleMiddleware } from "../middleware/role-middleware";
import { authMiddleware } from "../middleware/auth-middleware";
import { getRestaurants, postCreateRestaurant } from "../controllers/restaurantController";
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API for managing restaurants
 */

/**
 * @swagger
 * /getRestaurants:
 *   get:
 *     summary: Retrieve all restaurants
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The restaurant ID
 *                   name:
 *                     type: string
 *                     description: The restaurant name
 *                   address:
 *                     type: string
 *                     description: The restaurant address
 *                   rating:
 *                     type: number
 *                     format: float
 *                     description: The restaurant rating
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - User does not have the right role
 */

router.get(
  '/restaurants',
  authMiddleware,
  roleMiddleware('admin'),
  getRestaurants
);

/**
 * @swagger
 * /createRestaurant:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the restaurant
 *                 example: "The Good Place"
 *               address:
 *                 type: string
 *                 description: The address of the restaurant
 *                 example: "123 Food St, Flavor Town"
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The rating of the restaurant (0 to 5)
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Restaurant created successfully"
 *                 restaurantId:
 *                   type: integer
 *                   description: The ID of the created restaurant
 *       400:
 *         description: Bad Request - Invalid input data
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - User does not have the right role
 */

router.post(
  '/createRestaurant',
  authMiddleware,
  roleMiddleware('admin'),
  postCreateRestaurant
);

export default router;


