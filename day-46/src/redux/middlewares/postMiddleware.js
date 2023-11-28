import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("getPosts", async () => {
  const response = await fetch(
    `https://api-exercise-sopi.vercel.app/api/v1/products?limit=20`
  );
  const { data } = await response.json();
  return data.listProduct;
});

export const getTotalPages = createAsyncThunk("getTotalPages", async () => {
  const response = await fetch(
    `https://api-exercise-sopi.vercel.app/api/v1/products?limit=20`
  );
  const { data } = await response.json();
  return data.totalPage;
});
