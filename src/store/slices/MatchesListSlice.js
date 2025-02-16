import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchMatchesHero = createAsyncThunk(
  "matches/fetchMatchesHero",
  async (day, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/v2/matches/landing`);
      return response.data;
    } catch (error) {
      return rejectWithValue("");
    }
  }
);

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async ({ day, page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/v2/matches/landing`, {
        params: {
          day,
          page,
          limit,
          sort: "sorting",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("");
    }
  }
);
export const getImportantMatch = createAsyncThunk(
  "matches/getImportantMatch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/v2/matches/landing/important`);
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
    pagination: null,
    importantMatch: {},
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
        // state.isLoading = true;
        if (state.matches.length === 0) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "No Available Matches.";
      });
    builder
      .addCase(getImportantMatch.pending, (state) => {
        // state.isLoading = true;
        if (state.matches.length === 0) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(getImportantMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.importantMatch = action.payload.data;
      })
      .addCase(getImportantMatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "No Available important Match.";
      });
  },
});

export default MatchesSlice.reducer;
