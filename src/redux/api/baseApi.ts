import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://stationery-shop-eta.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `${token}`);
        }

        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
});