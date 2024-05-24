import { configureStore } from "@reduxjs/toolkit";
import themeSlice, { ThemeState } from "./themeSlice";
import chatSlice, { chatState } from "./chatSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    chat: chatSlice,
  },
});

export type RootState = {
  theme: ThemeState;
  chat: chatState;
};
export type AppDispatch = typeof store.dispatch;
