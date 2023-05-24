import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/auth";

const user =
  typeof window !== "undefined"
    ? window.localStorage.getItem("iemzone-user")
    : false;

const initialState = {
  user: user ? user : null,
  data: {},
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authServices.login(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getData = createAsyncThunk("auth/read", async (id, thunkAPI) => {
  try {
    return await authServices.getData(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
