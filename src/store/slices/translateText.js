import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en", // اللغة الافتراضية
  translations: {},
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTranslations: (state, action) => {
      state.translations = action.payload;
    },
  },
});

export const { setLanguage, setTranslations } = languageSlice.actions;

export default languageSlice.reducer;
