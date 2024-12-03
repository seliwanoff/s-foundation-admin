import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance"; // Axios instance with NProgress

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  authToken: null,
  error: null,
  loading: false, // To track loading state
};

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const response = await axiosInstance.get("/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Assuming response has user data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authToken = action.payload.token;
      state.error = null;

      // Save authToken to localStorage
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.authToken = null;
      state.error = action.payload;

      // Remove authToken from localStorage in case of failure
      localStorage.removeItem("authToken");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.authToken = null;
      state.error = null;

      // Clear authToken from localStorage
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update user data with the fetched data
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
