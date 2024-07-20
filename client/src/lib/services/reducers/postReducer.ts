import { SignInType, SignUpType } from "../../../types/auth";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const postApi = createApi({
    reducerPath: 'post',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:37650' }),
    tagTypes: ["sidebar", "user"],
    endpoints: (builder) => ({
        getAllPosts: builder.query<any, any>({
            query: () => ({
                url: "",
                method: 'GET',
            }),
            transformResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            transformErrorResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            providesTags: [{ type: 'sidebar', id: 'sidebar' }],
        }),
        refreshSideBar: builder.mutation<any, any>({
            query: () => ({
                url: "",
                method: 'GET',
            }),
            transformResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            transformErrorResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            invalidatesTags: [{ type: 'sidebar', id: 'sidebar' }],
        }),
        getUserPosts: builder.query<any, any>({
            query: () => ({
                url: "",
                method: 'GET',
            }),
            transformResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            transformErrorResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            providesTags: [{ type: 'user', id: 'user' }],
        }),
        newPost: builder.mutation<any, any>({
            query: () => ({
                url: "",
                method: 'POST',
            }),
            transformResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            transformErrorResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            invalidatesTags: [{ type: 'user', id: 'user' }],
        }),
        deletePost: builder.mutation<any, any>({
            query: () => ({
                url: "",
                method: 'DELETE',
            }),
            transformResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            transformErrorResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            invalidatesTags: [{ type: 'user', id: 'user' }],
        }),
        updatePost: builder.mutation<any, any>({
            query: () => ({
                url: "",
                method: 'DELETE',
            }),
            transformResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            transformErrorResponse: async (response: any, error: any) => {
                if (!response) throw new Error;
                localStorage.setItem('user', JSON.stringify(response.response));
                return response.response;
            },
            invalidatesTags: [{ type: 'user', id: 'user' }],
        })
    })
})


export const {useGetAllPostsQuery, useRefreshSideBarMutation, useDeletePostMutation, useNewPostMutation, useUpdatePostMutation, useGetUserPostsQuery} = postApi