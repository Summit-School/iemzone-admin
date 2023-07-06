import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import users from "./reducers/users";
import shops from "./reducers/shops";
import orders from "./reducers/orders";
import products from "./reducers/products";
import categories from "./reducers/categories";
import shipping from "./reducers/shipping";
import supportTicket from "./reducers/supportTicket";

export const store = configureStore({
  reducer: {
    auth,
    users,
    shops,
    orders,
    shipping,
    products,
    categories,
    supportTicket,
  },
});
