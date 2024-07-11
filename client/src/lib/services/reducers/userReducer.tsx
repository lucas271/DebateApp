import { SignInType, SignUpType } from "../../../types/auth";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:37650' }), // Replace with your actual API base URL
    tagTypes: ["Login"],
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
        transformErrorResponse: (error: any) => {
          if(!error?.data?.errors) return ["Unknown Error"]

          return error?.data?.errors
        },
      }),
    }),
});

export const {useLoginUserMutation, useSignUpUserMutation} = authApi