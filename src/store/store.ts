import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import chatSlice from "./chatSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
