export interface MenuItem {
  productId: number;
  quantity: number;
}

export interface PlaceOrderRequest {
  restaurantId: number;
  menuItems: MenuItem[];
}
