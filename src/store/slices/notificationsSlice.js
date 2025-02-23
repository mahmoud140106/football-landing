import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const saveSubscription = createAsyncThunk(
  "notifications/saveSubscription",
  async (subscription, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "api/v2/notifications/save-subscription",
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
          },
          lang: "en",
        }
      );
      // console.log("response", response.data);

      return response.data;
    } catch (error) {
      // console.log("notifications", error);
      return rejectWithValue(
        error.response?.data?.error?.message || "Something went wrong"
      );
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(saveSubscription.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(saveSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(saveSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default notificationsSlice.reducer;
