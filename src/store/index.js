import { configureStore } from "@reduxjs/toolkit";
import aboutReducer from "./slices/aboutSlice";
import contactReducer from "./slices/contactSlice";
import privacyReducer from "./slices/privacySlice";
import matchesListSlice from "./slices/MatchesListSlice";
import socialReducer from "./slices/SocialSlice";
import articleReducer from "./slices/articlesSlice";
// import languageReducer from "./slices/translateText ";

const store = configureStore({
  reducer: {
    about: aboutReducer,
    contact: contactReducer,
    privacy: privacyReducer,
    social: socialReducer,
    matches: matchesListSlice,
    article: articleReducer,
    // language: languageReducer,
  },
});

export default store;
