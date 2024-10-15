import { Request, Response, NextFunction } from "express";
import { MenuItem } from "./../../../src/schema/schemas/order_schemas/order_schema";
import request from "supertest";
import createServer from "../../../src/server"; // Update with your server's path
import Order from "../../../src/models/orderModel";
import OrderDishes from "../../../src/models/orderDishesModel"; // Adjust as needed
import Dish from "../../../src/models/dishModel"; // Adjust as needed
import jwt from "jsonwebtoken";
import { placeOrder } from "../../../src/controllers/orderController";

const app = createServer();

//models
jest.mock("../../../src/models/orderModel");
jest.mock("../../../src/models/orderDishesModel");
jest.mock("../../../src/models/dishModel");

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {
    user: {
      user: {
        id: 1, // Mock the user ID here
      },
    },
    body: {
      menuItems: [{ productId: 1, quantity: 2 }],
      restaurantId: 1,
      totalPrice: 20,
    },
  };
  const userId = req.user?.user.id;

  next = jest.fn();
});
// Generate a valid token for testing
const secret = process.env.JWT_SECRET || "default_secret";
const validToken = jwt.sign({ userId: 1 }, secret, { expiresIn: "1h" });

describe("POST /postOrder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Testcase 01 :
  it("should place an order successfully", async () => {
    const menuItems = [{ productId: 1, quantity: 2 }];

    // Mock the return values
    (Dish.findByPk as jest.Mock).mockResolvedValue({ id: 1 }); // Mock a found dish
    (Order.create as jest.Mock).mockResolvedValue({
      id: 1,
      totalPrice: 20,
      restaurantId: 1, // Mock the restaurantId as well
      save: jest.fn(),
    }); // Mock a new order with totalPrice
    (OrderDishes.create as jest.Mock).mockResolvedValue({ save: jest.fn() }); // Mock created order dishes

    const response = await request(app)
      .post("/postOrder")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ menuItems, restaurantId: 1 })
      .expect(201);

    expect(response.body.message).toBe("Order placed successfully");
    expect(response.body.order.totalPrice).toBe(20);
  });

  it("should return 400 if no menu items are provided", async () => {
    const response = await request(app).post("/postOrder").set("Authorization", `Bearer ${validToken}`).send({ restaurantId: 1 }).expect(400);

    expect(response.body.error).toBe("No menu items provided");
  });

  it("should return 404 if a menu item is not found", async () => {
    const menuItems = [{ productId: 1, quantity: 2 }];

    (Dish.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post("/postOrder")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ menuItems, restaurantId: 1 })
      .expect(404);

    expect(response.body.error).toBe("Menu item with ID 1 not found");
  });

  it("should return 500 if an error occurs", async () => {
    const menuItems = [{ productId: 1, quantity: 2 }];

    (Dish.findByPk as jest.Mock).mockImplementation(() => {
      throw new Error("DB Error");
    });

    const response = await request(app)
      .post("/postOrder")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ menuItems, restaurantId: 1 })
      .expect(500);

    expect(response.body.error).toBe("Failed to place order");
  });
});
