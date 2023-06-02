import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopsServices from "../services/shops";

const initialState = {
  shops: [],
  shop: null,
};

export const getShops = createAsyncThunk("shop/getShops", async (thunkAPI) => {
  try {
    return await shopsServices.shops();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getShop = createAsyncThunk(
  "shop/getShop",
  async (id, thunkAPI) => {
    try {
      return await shopsServices.shop(id);
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

export const verifyShop = createAsyncThunk(
  "shop/verifyShop",
  async (data, thunkAPI) => {
    try {
      return await shopsServices.verifyShop(data);
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

export const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShops.fulfilled, (state, action) => {
        state.shops = action.payload;
      })
      .addCase(getShop.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addCase(verifyShop.fulfilled, (state, action) => {
        state.shops = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = shopSlice.actions;

export default shopSlice.reducer;
