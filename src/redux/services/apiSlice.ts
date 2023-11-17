import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NotebookDTO } from '@/types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '../api'
    }),
    tagTypes: ['Categories', 'Notebooks'],
    endpoints: (builder) => ({
        getNotebooks: builder.query<NotebookDTO, null>({
            query: () => '/notebooks',
            providesTags: ["Notebooks"]
        }),
        createNotebook: builder.mutation({
            query: (newNotebook) => ({
                url: '/notebooks',
                method: "POST",
                body: newNotebook
            }),
            invalidatesTags: ["Notebooks"]
        }),
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
    useGetNotebooksQuery,
    useCreateNotebookMutation,
    useCreateCategorieMutation
} = apiSlice;