import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersServices from "../services/orders";

const initialState = {
  orders: [],
  order: null,
};

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (thunkAPI) => {
    try {
      return await ordersServices.orders();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (id, thunkAPI) => {
    try {
      return await ordersServices.order(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
