import apiSlice from '@/features/api/apiSlice';

const applicationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchApplications: builder.query({
      query: ({ page, limit, sortField, sortValue, status }) => ({
        url: `/applications?page=${page}&limit=${limit}&sortField=${sortField}&sortValue=${sortValue}${
          status === 'all' ? '' : `&status=${status}`
        }`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchApplicationsQuery } = applicationsApi;
