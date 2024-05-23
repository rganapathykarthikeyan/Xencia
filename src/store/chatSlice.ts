import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatListTitleHistory } from "../lib/constants";

const initialState = ChatListTitleHistory;

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<string>) => {
      state.push({
        id: Math.floor(Math.random() * 3215123211).toString(),
        name: action.payload,
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
            data: action.payload,
            timeStamp: new Date().toLocaleString("en-GB").replace(",", ""),
          },
        ],
      });
    },
  },
});

export const { addChat } = chatSlice.actions;

export default chatSlice.reducer;
