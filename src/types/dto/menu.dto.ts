export interface GetMenuDtoParam {
  restaurantId: string; // Assuming restaurantId is a number
}
export interface GetMenuDtoQuery {
  page?: string; // Optional since you're parsing it as a string
  limit?: string; // Optional since you're parsing it as a string
}
