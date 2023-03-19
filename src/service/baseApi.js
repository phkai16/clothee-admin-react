import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../globalVariables";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    withCredentials: true,
    prepareHeaders: (headers, { getState }) => {
      const TOKEN = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";

      if (TOKEN) {
        headers.set("token", `Bearer ${TOKEN}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Order"],
  endpoints: () => ({}),
});
