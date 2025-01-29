import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchVisits = createAsyncThunk(
  "visits/fetchVisits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v1/visits/landing");
      return response.data.visits;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching visits");
    }
  }
);

const visitsSlice = createSlice({
  name: "visits",
  initialState: {
    count: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisits.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVisits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload; // حفظ عدد الزيارات
      })
      .addCase(fetchVisits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default visitsSlice.reducer;
