import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/authApi";

// 🔐 LOGIN ACTION
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data) => {
    const response = await loginApi(data);

    // Store token
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("org_id", response.data.org_id || "1");

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;