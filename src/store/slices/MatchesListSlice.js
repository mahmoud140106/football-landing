import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

// Fetch Matches Hero
export const fetchMatchesHero = createAsyncThunk(
  "matches/fetchMatchesHero", // Updated type string
  async (day, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/v1/matches/landing`);
      // console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Fetch Matches Hero Error:", error);
      return rejectWithValue(
        error.response?.data || "Error fetching Matches Hero"
      );
    }
  }
);

// Fetch Matches
export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches", // Kept this as it is
  async (day, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/v1/matches/landing?day=${day}`);
      // console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Fetch Matches Error:", error);
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
      .addCase(fetchMatchesHero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatchesHero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload.data; // فقط خزّن البيانات
      })
      .addCase(fetchMatchesHero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch matches.";
      });

    builder
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload.data; // فقط خزّن البيانات
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch matches.";
      });
  },
});

export default MatchesSlice.reducer;
