import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// دالة لترجمة النصوص باستخدام Google Translate API
const translateText = async (text, targetLanguage) => {
  const apiKey = "YOUR_GOOGLE_API_KEY";
  const url = `https://translation.googleapis.com/language/translate/v2`;

  const response = await axios.post(url, {
    q: text,
    target: targetLanguage,
    key: apiKey,
  });

  return response.data.data.translations[0].translatedText;
};

// AsyncThunk للترجمة
export const fetchTranslation = createAsyncThunk(
  "language/fetchTranslation",
  async ({ text, language }) => {
    const translated = await translateText(text, language);
    return { text, translated };
  }
);

const languageSlice = createSlice({
  name: "language",
  initialState: {
    language: "en",
    translations: {},
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTranslation.fulfilled, (state, action) => {
      const { text, translated } = action.payload;
      state.translations[text] = translated;
    });
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
