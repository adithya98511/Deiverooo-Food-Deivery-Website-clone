// import { Sequelize } from "sequelize-typescript";
// import User from "../models/userModel"; // Adjust the path according to your project structure
// import Restaurant from "../models/restaurantModel"; // Adjust the path according to your project structure
// import Dish from "../models/dishModel"; // Make sure the path is correct
// import Order from "../models/orderModel"; // Make sure the path is correct
// import OrderDishes from "../models/orderDishesModel"; // Make sure the path is correct
// import Category from "../models/category"; // Make sure the path is correct
// import Rating from "../models/ratingModel"; // Make sure the path is correct

// const sequelize = new Sequelize({
//   host: "localhost",
//   username: "root",
//   password: "Cst19023",
//   database: "database_3",
//   dialect: "mysql",
//   models: [User, Restaurant, Dish, Order, OrderDishes, Category, Rating], // Include all models
//   logging: console.log,
// });

// export default sequelize;

// import { Sequelize, SequelizeOptions } from "sequelize";
// import User from "../models/userModel";
// import Restaurant from "../models/restaurantModel";
// import Dish from "../models/dishModel";
// import Order from "../models/orderModel";
// import OrderDishes from "../models/orderDishesModel";
// import Category from "../models/category";
// import Rating from "../models/ratingModel";

// const sequelizeOptions: SequelizeOptions = {
//   host: "localhost",
//   username: "root",
//   password: "Cst19023",
//   database: "database_3",
//   dialect: "mysql",
//   models: [User, Restaurant, Dish, Order, OrderDishes, Category, Rating], // Include all models
//   logging: console.log,
// };

// // Create a new instance of Sequelize with the typed options
// const sequelize = new Sequelize(sequelizeOptions);

// export default sequelize;

import { Sequelize, Dialect } from "sequelize";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Helper function to get environment variables safely
const getEnvVar = (varName: string): string => {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Missing environment variable: ${varName}`);
  }
  return value;
};

// Create Sequelize instance
const sequelize = new Sequelize(getEnvVar("DB_NAME"), getEnvVar("DB_USER"), getEnvVar("DB_PASSWORD"), {
  host: getEnvVar("DB_HOST"),
  dialect: "mysql" as Dialect,
  logging: console.log,
});

export default sequelize;