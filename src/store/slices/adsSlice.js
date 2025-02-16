import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v2/ads/landing", {
        params: { type, lang: "en" },
      });
      return response.data.data;
    } catch (error) {
      console.log("ads", error);
      return rejectWithValue(error.response?.data?.error?.message || "");
    }
  }
);
export const fetchAdsCompanies = createAsyncThunk(
  "ads/fetchAdsCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v2/ads-companies/landing", {
        params: {
          // type,
          lang: "en",
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("ads", error);
      return rejectWithValue(error.response?.data?.error?.message || "");
    }
  }
);
export const fetchKeywords = createAsyncThunk(
  "ads/fetchKeywords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v2/keywords/landing", {
        params: {
          lang: "en",
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("ads", error);
      return rejectWithValue(error.response?.data?.error?.message || "");
    }
  }
);

const AdsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    adsCompanies: [],
    keywords: [],
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
    builder
      .addCase(fetchAdsCompanies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchAdsCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.adsCompanies = action.payload || [];
      })
      .addCase(fetchAdsCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
    builder
      .addCase(fetchKeywords.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchKeywords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.keywords = action.payload || [];
      })
      .addCase(fetchKeywords.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default AdsSlice.reducer;
