import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    email: "",
    isLogin: false,
    ApiKey: "",
  },
};

export const loginSlice = createSlice({
  name: "trello",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.login.isLogin = action.payload;
    },
  },
});
