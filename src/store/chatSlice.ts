import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatListTitleHistory } from "../lib/constants";

const initialState = ChatListTitleHistory;

export type chatState = {
  id: string;
  name: string;
  timeStamp: string;
  chatHistory: {
    id: string;
    type: string;
    data: string;
    timeStamp: string;
  }[];
}[];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addNewChat: (
      state: chatState,
      action: PayloadAction<{ id: string; user: string; bot: string }>
    ) => {
      state.push({
        id: action.payload.id,
        name: action.payload.user,
        timeStamp: new Date()
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-"),
        chatHistory: [
          {
            id: Math.floor(Math.random() * 3216321315).toString(),
            type: "User",
            data: action.payload.user,
            timeStamp: new Date().toLocaleTimeString("en-GB", {
              hour12: true,
            }),
          },
          {
            id: Math.floor(Math.random() * 3216321315).toString(),
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
      state: chatState,
      action: PayloadAction<{ user: string; id: string }>
    ) => {
      const chatID = state.findIndex((chat) => chat.id === action.payload.id);
      state[chatID].chatHistory.push({
        id: Math.floor(Math.random() * 3216120315).toString(),
        type: "User",
        data: action.payload.user,
        timeStamp: new Date().toLocaleTimeString("en-GB", {
          hour12: true,
        }),
      });
    },
    addBotChat: (
      state: chatState,
      action: PayloadAction<{ bot: string; id: string }>
    ) => {
      const chatID = state.findIndex((chat) => chat.id === action.payload.id);
      state[chatID].chatHistory.push({
        id: Math.floor(Math.random() * 32112020315).toString(),
        type: "Bot",
        data: action.payload.bot,
        timeStamp: new Date().toLocaleTimeString("en-GB", {
          hour12: true,
        }),
      });
    },
    removeChat: (state: chatState, action: PayloadAction<{ id: string }>) => {
      const chatID = state.findIndex((chat) => chat.id === action.payload.id);
      state[chatID].chatHistory = [];
    },
  },
});

export const { addNewChat, addUserChat, addBotChat, removeChat } =
  chatSlice.actions;

export default chatSlice.reducer;
