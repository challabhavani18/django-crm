import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardApi } from "../api/dashboardApi";

//  FETCH DASHBOARD
export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async () => {
    const response = await getDashboardApi();
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;