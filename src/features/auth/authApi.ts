import apiSlice from '@/features/api/apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkAdminAuth: builder.query({
      query: () => ({
        url: '/auth',
        method: 'GET',
      }),
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: `/signin`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSigninMutation, useCheckAdminAuthQuery } = authApi;
