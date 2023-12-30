import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mindmapApi = createApi({
  reducerPath: "mindmapApi",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://p9shrn-8080.csb.app/",
  }),
  tagTypes: ["Mindmap"],
  endpoints: (builder) => ({
    getMindmap: builder.query({
      query: () => `/Mindmap`,
      providesTags: (result) => {
        const data = [
          ...result.map(({ id }) => ({
            type: "Mindmap",
            id,
          })),
          { type: "Mindmap", id: "LIST" },
        ];
        return data;
      },
    }),
    addNewMindmap: builder.mutation({
      query: (data) => {
        return {
          url: `/Mindmap`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Mindmap", id: "LIST" }],
    }),
  }),
});
