import {configureStore} from "@reduxjs/toolkit";
import aboutReducer from "./slices/aboutSlice";
import contactReducer from "./slices/contactSlice";
import privacyReducer from "./slices/privacySlice";
import matchesListSlice from "./slices/MatchesListSlice";
import socialReducer from "./slices/SocialSlice";
import articleReducer from "./slices/articlesSlice";
import AdsReducer from "./slices/adsSlice";
import VisitsReducer from "./slices/visitsSlice";
import notificationsReducer from "./slices/notificationsSlice";
const store = configureStore({
  reducer: {
    about: aboutReducer,
    contact: contactReducer,
    privacy: privacyReducer,
    social: socialReducer,
    matches: matchesListSlice,
    article: articleReducer,
    ads: AdsReducer,
    visits: VisitsReducer,
    notifications: notificationsReducer,
  },
});

export default store;
