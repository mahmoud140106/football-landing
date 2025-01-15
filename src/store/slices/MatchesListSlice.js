import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v1/matches/landing");
      console.log("API Response:", response.data); // تحقق من البيانات هنا
      return response.data.data; // تأكد أن .data.data موجودة فعلاً
    } catch (error) {
      console.error("Fetch Matches Error:", error);
      return rejectWithValue(error.response?.data || "Error fetching Matches");
    }
  }
);

const MatchesSlice = createSlice({
  name: "matches",
  initialState: {
    matches: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch matches.";
      });
  },
});

export default MatchesSlice.reducer;
