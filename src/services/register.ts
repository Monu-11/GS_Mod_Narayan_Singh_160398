import { QUERY_KEYS } from '@/core/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerApi = createApi({
  reducerPath: QUERY_KEYS.REGISTER_USER,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/sign-up`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData: { email: string; password: string }) => ({
        url: '/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = registerApi;
