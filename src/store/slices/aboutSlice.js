import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v1/about/landing");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching About");
    }
  }
);

const AboutSlice = createSlice({
  name: "about",
  initialState: {
    about: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.about = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default AboutSlice.reducer;
