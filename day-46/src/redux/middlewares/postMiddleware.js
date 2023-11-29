import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("getPosts", async (page) => {
  const response = await fetch(
    `https://api-exercise-sopi.vercel.app/api/v1/products?limit=20&page=${page}`
  );
  const { data } = await response.json();
  return data.listProduct;
});

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async (id) => {
    const response = await fetch(
      `https://api-exercise-sopi.vercel.app/api/v1/products/${id}`
    );
    const { data } = await response.json();
    console.log(data);
    // return data;
  }
);
