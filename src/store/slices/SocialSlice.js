import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchSocial = createAsyncThunk(
  "social/fetchSocial",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v1/social/landing");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching Social");
    }
  }
);

const SocialSlice = createSlice({
  name: "social",
  initialState: {
    social: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSocial.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchSocial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.social = action.payload;
      })
      .addCase(fetchSocial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default SocialSlice.reducer;
