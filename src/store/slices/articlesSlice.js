import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `api/v1/articles/landing?page=1&limit=1000`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching articles");
    }
  }
);

export const fetchArticleDetails = createAsyncThunk(
  "article/fetchArticleDetails",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/v1/articles/landing/${_id}`);
      console.log("API response:", response); // أضف هذا السطر
      return response.data;
    } catch (error) {
      console.error("Error:", error); // سجل أي خطأ هنا
      return rejectWithValue(
        error.response?.data || "Error fetching article details"
      );
    }
  }
);

const ArticleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
    articleDetails: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // جلب جميع المقالات
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
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // جلب تفاصيل المقالة
      .addCase(fetchArticleDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchArticleDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.articleDetails = action.payload.data; // تخزين تفاصيل المقالة
      })
      .addCase(fetchArticleDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default ArticleSlice.reducer;
