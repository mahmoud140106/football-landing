import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchMatchesHero = createAsyncThunk(
  "matches/fetchMatchesHero",
  async (day, {rejectWithValue}) => {
    try {
      const response = await api.get(`api/v1/matches/landing`);
      return response.data;
    } catch (error) {
      return rejectWithValue("");
    }
  }
);

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (day, {rejectWithValue}) => {
    try {
      const response = await api.get(`api/v1/matches/landing?day=${day}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("");
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
        state.matches = action.payload.data;
      })
      .addCase(fetchMatchesHero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "No Available Matches.";
      });

    builder
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload.data;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "No Available Matches.";
      });
  },
});

export default MatchesSlice.reducer;
