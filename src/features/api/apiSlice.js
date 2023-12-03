import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["todos"],
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
    }),
    addTodo: builder.mutation({
      query: (todo) => ({ url: "/todos", method: "POST", body: todo }),
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({ url: `/todos/${todo.id}`, method: "PATCH", body: todo }),
      invalidatesTags: ["todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({ url: `/todos/${id}`, method: "DELETE", body: id }),
      invalidatesTags: ["todos"],
    }),
  }),
});
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = apiSlice;
