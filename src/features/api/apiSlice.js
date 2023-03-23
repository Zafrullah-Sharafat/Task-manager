import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addSelects } from "../filter/filterSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),
  endpoints: (builder) => ({
    // Get all team Members
    getTeam: builder.query({
      query: () => "/team",
    }),

    // Get all Projects
    getProjects: builder.query({
      query: () => "/projects",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const selects = result.data.map((project) => project.projectName);

          // update local state by adding all project in selected mode
          dispatch(addSelects(selects));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetProjectsQuery, useGetTeamQuery } = apiSlice;
