import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get("api/v1/contact/landing");
      return response.data.data;
    } catch (error) {
      return rejectWithValue("");
    }
  }
);

const ContactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.contact = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default ContactSlice.reducer;
