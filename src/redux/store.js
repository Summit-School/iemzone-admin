import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import users from "./reducers/users";

export const store = configureStore({
  reducer: {
    auth,
    users,
  },
});
