import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slice/counterSlice";
import { paginateSlice } from "./slice/paginateSlice";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    paginate: paginateSlice.reducer,
  },
});
