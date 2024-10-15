import Dish from './dish';
import Order from './order';
import OrderDishes from './orderDishesModel';
import Restaurant from './restaurantModel';
import User from './userModel';
import Category from './category';

Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Dish.belongsTo(Category, { foreignKey: 'categoryId' });
Dish.belongsToMany(Order, {
  through: OrderDishes,
  foreignKey: 'dishId',
  otherKey: 'orderId',
});

OrderDishes.belongsTo(Order, { foreignKey: 'orderId' });
OrderDishes.belongsTo(Dish, { foreignKey: 'dishId' });

Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
Order.belongsToMany(Dish, {
  through: OrderDishes,
  foreignKey: 'orderId',
  otherKey: 'dishId',
});

Restaurant.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Restaurant.hasMany(Dish, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });

User.hasMany(Restaurant, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
