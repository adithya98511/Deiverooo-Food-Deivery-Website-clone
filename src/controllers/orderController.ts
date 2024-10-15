import { Request, Response, NextFunction } from 'express';
import Order from '../models/order';
import OrderDishes from '../models/orderDishesModel';
import Dish from '../models/dish';
import { createNewOrder, createOrderDishes } from '../services/orderService';
import sequelize from '../util/db';

// // export const placeOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   try {
//     // console.log('Req body : ', req.body);
//     const { menuItems, restaurantId } = req.body;
//     // console.log("Restaurant Id : ", restaurantId);

//     const userId = req.user?.user.id;
//     // console.log("User : ", req.user);

//     if (!menuItems || menuItems.length === 0) {
//       return res.status(400).json({ error: "No menu items provided" });
//     }

//     const newOrder = await createNewOrder({ userId: userId, restaurantId: restaurantId, totalPrice: 0 });

//     let totalPrice = 0;

//     for (const item of menuItems) {
//       const menu = await Dish.findByPk(item.productId);

//       if (!menu) {
//         return res.status(404).json({ error: `Menu item with ID ${item.productId} not found` });
//       }

//       // order-dishes is not working
//       const orderDishes = await OrderDishes.create({
//         restaurantId: restaurantId,
//         orderId: newOrder.id,
//         dishId: menu.id,
//         quantity: item.quantity,
//       });

//       await orderDishes.save();

//       totalPrice += menu.price * item.quantity;
//     }

//     newOrder.totalPrice = totalPrice;
//     await newOrder.save();

//     return res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     return res.status(500).json({ error: "Failed to place order" });
//   }
// };
interface MenuItem {
  productId: number;
  quantity: number;
}

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const transaction = await sequelize.transaction();
  try {
    const {
      menuItems,
      restaurantId,
    }: { menuItems: MenuItem[]; restaurantId: number } = req.body;
    const userId: number = req.user?.user.id;

    if (!menuItems || menuItems.length === 0) {
      return res.status(400).json({ error: 'No menu items provided' });
    }

    // Create the order
    const newOrder = await createNewOrder(
      { userId, restaurantId, totalPrice: 0 },
      { transaction }
    );

    // Collect all productIds to fetch dishes in a single query
    const productIds = menuItems.map((item: any) => item.productId);
    const dishes = await Dish.findAll({
      where: { id: productIds },
      transaction,
    });

    // If any menu item is missing
    if (dishes.length !== menuItems.length) {
      return res.status(404).json({ error: 'Some menu items not found' });
    }

    // Create order dishes in bulk
    const orderDishesData = menuItems.map((item: any) => {
      const dish = dishes.find((d: any) => d.id === item.productId);
      return {
        restaurantId: restaurantId,
        orderId: newOrder.id,
        dishId: dish?.id,
        quantity: item.quantity,
      };
    });

    await OrderDishes.bulkCreate(orderDishesData, { transaction });

    // Calculate total price
    const totalPrice = orderDishesData.reduce((acc, item) => {
      const dish = dishes.find((d: any) => d.id === item.dishId);
      return acc + dish!.price * item.quantity;
    }, 0);

    // Update the order with total price
    newOrder.totalPrice = totalPrice;
    await newOrder.save({ transaction });

    await transaction.commit();

    return res
      .status(201)
      .json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    // Rollback transaction in case of any error
    await transaction.rollback();
    next(error);
  }
};
