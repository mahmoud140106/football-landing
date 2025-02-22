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
      return response.data.data;
    } catch (error) {
      console.log("notifications", error);
      return rejectWithValue(
        error.response?.data?.error?.message || "Something went wrong"
      );
    }
  }
);

export const getSubscriptions = createAsyncThunk(
  "notifications/getSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/v2/notifications/subscriptions", {
        params: { lang: "en" },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Something went wrong"
      );
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    subscriptions: [],
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
        state.subscriptions.push(action.payload);
      })
      .addCase(saveSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getSubscriptions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.subscriptions = action.payload || [];
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default notificationsSlice.reducer;
