// store/slices/articlesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `api/v1/articles/landing?page=${page}&limit=${limit}`
      );
      return response.data; // العودة بكل البيانات بما فيها البيانات والـ pagination
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching Article");
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
    pagination: {
      currentPage: 1,
      totalPages: 5,
      limit: 20,
    },
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
        state.article = action.payload.data; // البيانات الفعلية للمقالات
        state.pagination.totalPages = action.payload.pagination.numberOfPages;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default ArticleSlice.reducer;
