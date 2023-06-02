import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import users from "./reducers/users";
import shops from "./reducers/shops";
import orders from "./reducers/orders";
import products from "./reducers/products";
import categories from "./reducers/categories";

export const store = configureStore({
  reducer: {
    auth,
    users,
    shops,
    orders,
    products,
    categories,
  },
});
