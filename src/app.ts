// import express from 'express';
// import cors from 'cors';
// import { Request, Response } from 'express';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJsDoc from 'swagger-jsdoc';
// import sequelize from './util/db';
// import User from './models/userModel';
// import Restaurant from './models/restaurantModel';
// import Dish from './models/dishModel';
// import Order from './models/orderModel';
// import OrderDishes from './models/orderDishesModel';
// import Category from './models/categoryModel';
// import Rating from './models/ratingModel';
// import userRoutes from './routes/userRouter';
// import restaurantRoutes from './routes/restaurantRouter';
// import swaggerOptions from './swagger'; // Import your Swagger setup

// const app = express();
// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:5173', // Allow frontend to connect
// }));

// const PORT = 8080;

// // Serve Swagger UI at /api-docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');

//     sequelize.sync({ force: false })
//       .then(() => {
//         console.log('User table has been created (if it didn\'t already exist).');
//         app.listen(PORT, () => {
//           console.log("Server running on port ", PORT);
//         });
//       })
//       .catch((err) => {
//         console.error('Error creating the table:', err);
//       });
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// app.get('/', (req: Request, res: Response) => {
//   res.send(`Serving on port ${PORT}`);
// });

// // Routes
// app.use(userRoutes);
// app.use(restaurantRoutes);


//----------------------FROM HERE---------------------------------------
// import express from 'express';
// import cors from 'cors';
// import { Request, Response } from 'express';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJsDoc from 'swagger-jsdoc';
// import sequelize from './util/db';
// import User from './models/userModel';
// import Restaurant from './models/restaurantModel';
// import Dish from './models/dishModel';
// import Order from './models/orderModel';
// import OrderDishes from './models/orderDishesModel';
// import Category from './models/categoryModel';
// import Rating from './models/ratingModel';
// import userRoutes from './routes/userRouter';
// import orderRoutes from './routes/orderRouter';
// import restaurantRoutes from './routes/restaurantRouter';
// import menuRoutes from './routes/menuRouter';
// import { refreshToken } from './util/token';
// import swaggerOptions from './swagger/swagger'; // Import your Swagger setup

// const app = express();
// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:5173', // Allow frontend to connect
// }));

// const PORT = 8080;

// // Serve Swagger UI at /api-docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');

//     sequelize.sync({ force: false })
//       .then(() => {
//         console.log('User table has been created (if it didn\'t already exist).');
//         app.listen(PORT, () => {
//           console.log("Server running on port ", PORT);
//         });
//       })
//       .catch((err) => {
//         console.error('Error creating the table:', err);
//       });
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// app.get('/', (req: Request, res: Response) => {
//   res.send(`Serving on port ${PORT}`);
// });

// // Routes
// app.use(userRoutes);
// app.use(restaurantRoutes);
// app.use(menuRoutes);
// app.use(orderRoutes);
// app.use('/token', refreshToken);

