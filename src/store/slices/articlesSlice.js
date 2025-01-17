// store/slices/articlesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `api/v1/articles/landing?page=1&limit=1000`
      ); // جلب كل المقالات
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching articles");
    }
  }
);

const ArticleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
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
        state.article = action.payload.data; // تخزين المقالات
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default ArticleSlice.reducer;
