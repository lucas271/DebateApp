import { AnyListenerPredicate } from "@reduxjs/toolkit";
import { SignInType, SignUpType } from "../../../types/auth";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:37650' }), // Replace with your actual API base URL
    tagTypes: ["auth"],
    endpoints: (builder) => ({
      loginUser: builder.mutation<SignInType, SignInType>({
        query: (credentials) => ({
          url: '/loginUser',
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        }),
        transformResponse: async (response: any, error: any) => {
          if (!response) throw new Error;
          localStorage.setItem('user', JSON.stringify(response.response));
          return response.response;
        },
        invalidatesTags: [{ type: 'auth', id: 'main' }],
        transformErrorResponse: (error: any) => {
          if(!error?.data?.errors) return ["Unknown Error"]
          return error?.data?.errors
        },
      }),
      signUpUser: builder.mutation<SignUpType, SignUpType>({
        query: (credentials) => ({
          url: '/createUser',
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        }),
        transformResponse: async (response: any, error: any) => {
          if (!response) throw new Error;
  
          localStorage.setItem('user', JSON.stringify(response.response));
          return response.response;
        },
        invalidatesTags: [{ type: 'auth', id: 'main' }],
        transformErrorResponse: (error: any) => {
          if(!error?.data?.errors) return ["Unknown Error"]

          return error?.data?.errors
        },
      }),
      getAllUsers: builder.query<any, any>({
        query: (credentials) => ({
          url: '/getAllUsers',
          method: 'get',
          query: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json'},
        }),
        providesTags: [{ type: 'auth', id: 'main' }],
        transformResponse: async (response: any, error: any) => {
          console.log(response, " doakspdlaspldpasl")
          if (!response) throw new Error;

          return response.response;
        },
        transformErrorResponse: (error: any) => {
          if(!error?.data?.errors) return ["Unknown Error"]

          return error?.data?.errors
        },
      })
    }),
});

export const {useLoginUserMutation, useSignUpUserMutation,  useGetAllUsersQuery} = authApi
