import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersServices from "../services/users";

const initialState = {
  users: [],
};

export const getUsers = createAsyncThunk("auth/login", async (thunkAPI) => {
  try {
    return await usersServices.users();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
