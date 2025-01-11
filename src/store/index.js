import { configureStore } from "@reduxjs/toolkit";
import aboutReducer from "./slices/aboutSlice";
import contactReducer from "./slices/contactSlice";
import privacyReducer from "./slices/privacySlice";
import matchesListSlice from "./slices/MatchesListSlice";
import socialReducer from "./slices/SocialSlice";
import articleReducer from "./slices/articlesSlice";

const store = configureStore({
  reducer: {
    about: aboutReducer, // 1
    contact: contactReducer, // 1
    privacy: privacyReducer, // 1
    matchesList: matchesListSlice,
    social: socialReducer,
    article: articleReducer,
  },
});

export default store;
