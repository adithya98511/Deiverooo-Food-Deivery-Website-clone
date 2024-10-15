// server.ts
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import sequelize from './util/db';
import userRoutes from './routes/userRouter';
import orderRoutes from './routes/orderRouter';
import restaurantRoutes from './routes/restaurantRouter';
import menuRoutes from './routes/menuRouter';
import swaggerOptions from './swagger/swagger';

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend to connect
  }));

  // Serve Swagger UI at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

  // Routes
  app.use(userRoutes);
  app.use(restaurantRoutes);
  app.use(menuRoutes);
  app.use(orderRoutes);

  return app;
};

export default createServer;
