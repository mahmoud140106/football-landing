import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/v2/articles/landing`, {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || "No Available Articles"
      );
    }
  }
);

const ArticleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
    pagination:null,
    articleDetails: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.article = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default ArticleSlice.reducer;
