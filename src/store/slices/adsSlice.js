import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async ({type}, {rejectWithValue}) => {
    try {
      const response = await api.get("api/v1/ads/landing", {
        params: {type, lang: "en"},
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "");
    }
  }
);

const AdsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.ads = action.payload || [];
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default AdsSlice.reducer;
