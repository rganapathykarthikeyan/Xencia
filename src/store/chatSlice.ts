import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatListTitleHistory } from "../lib/constants";

const initialState = ChatListTitleHistory;

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addNewChat: (
      state,
      action: PayloadAction<{ user: string; bot: string }>
    ) => {
      state.push({
        id: Math.floor(Math.random() * 3215123211).toString(),
        name: action.payload.user,
        timeStamp: new Date()
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-"),
        chatHistory: [
          {
            id: Math.floor(Math.random()).toString(),
            type: "User",
            data: action.payload.user,
            timeStamp: new Date().toLocaleTimeString("en-GB", {
              hour12: true,
            }),
          },
          {
            id: Math.floor(Math.random()).toString(),
            type: "Bot",
            data: action.payload.bot,
            timeStamp: new Date().toLocaleTimeString("en-GB", {
              hour12: true,
            }),
          },
        ],
      });
    },
    addUserChat: (
      state,
      action: PayloadAction<{ user: string; id: string }>
    ) => {
      const chatID = state.findIndex((chat) => chat.id === action.payload.id);
      state[chatID].chatHistory.push({
        id: Math.floor(Math.random()).toString(),
        type: "User",
        data: action.payload.user,
        timeStamp: new Date().toLocaleTimeString("en-GB", {
          hour12: true,
        }),
      });
    },
    addBotChat: (state, action: PayloadAction<{ bot: string; id: string }>) => {
      const chatID = state.findIndex((chat) => chat.id === action.payload.id);
      state[chatID].chatHistory.push({
        id: Math.floor(Math.random()).toString(),
        type: "Bot",
        data: action.payload.bot,
        timeStamp: new Date().toLocaleTimeString("en-GB", {
          hour12: true,
        }),
      });
    },
  },
});

export const { addNewChat, addUserChat, addBotChat } = chatSlice.actions;

export default chatSlice.reducer;
