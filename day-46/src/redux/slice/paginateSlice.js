import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
};

export const paginateSlice = createSlice({
  name: "paginate",
  initialState,
  reducers: {
    query: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});
