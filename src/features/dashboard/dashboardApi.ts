import apiSlice from '@/features/api/apiSlice';

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDashboardSummery: builder.query({
      query: () => ({
        url: `/dashboard/summery`,
        method: 'GET',
      }),
    }),
    fetchDashboardRecentJobs: builder.query({
      query: () => ({
        url: `/dashboard/recent-jobs`,
        method: 'GET',
      }),
    }),
    fetchDashboardRecentApplications: builder.query({
      query: () => ({
        url: `/dashboard/recent-applications`,
        method: 'GET',
      }),
    }),
    fetchDashboardTopComapanies: builder.query({
      query: () => ({
        url: `/dashboard/top-companies`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useFetchDashboardSummeryQuery,
  useFetchDashboardRecentJobsQuery,
  useFetchDashboardRecentApplicationsQuery,
  useFetchDashboardTopComapaniesQuery,
} = dashboardApi;
