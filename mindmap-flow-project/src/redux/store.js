import { configureStore } from "@reduxjs/toolkit";
import { mindmapApi } from "./services/mindmapApi";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    [mindmapApi.reducerPath]: mindmapApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), mindmapApi.middleware];
  },
});

setupListeners(store.dispatch);
