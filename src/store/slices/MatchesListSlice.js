import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v1/matches/landing");
      console.log("Fetched matches:", response.data.data); // Log the fetched matches
      return response.data.data;
    } catch (error) {
      console.log("Error fetching matches:", error); // Log the error if the fetch fails
      return rejectWithValue(error.response?.data || "Error fetching Matches");
    }
  }
);

const MatchesSlice = createSlice({
  name: "matches",
  initialState: {
    matches: [],
    selectedTab: "today", // This initializes selectedTab as "today"
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = MatchesSlice.actions;
export default MatchesSlice.reducer;
