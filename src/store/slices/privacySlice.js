import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchPrivacy = createAsyncThunk(
  "privacy/fetchPrivacy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v1/privacy/landing");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching Privacy");
    }
  }
);

const PrivacySlice = createSlice({
  name: "privacy",
  initialState: {
    privacy: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacy.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchPrivacy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.privacy = action.payload;
      })
      .addCase(fetchPrivacy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default PrivacySlice.reducer;
