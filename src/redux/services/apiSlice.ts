import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '../api'
    }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        createCategorie: builder.mutation({
            query: (newCategorie) => ({
                url: '/categories',
                method: "POST",
                body: newCategorie
            }),
            invalidatesTags: ["Categories"]
        })
    })
});

export const {
    useCreateCategorieMutation
} = apiSlice;