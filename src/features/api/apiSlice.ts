import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
    // eslint-disable-next-line no-empty-pattern
    prepareHeaders: (headers, {}) => {
      const token = localStorage.getItem('x-access-token');

      if (token) {
        headers.set('x-access-token', `${token}`);
      }
      return headers;
    },
  }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});

export default apiSlice;
