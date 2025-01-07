import apiSlice from '@/features/api/apiSlice';

const jobsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchJobs: builder.query({
      query: ({
        page,
        limit,
        search,
        sortField,
        sortValue,
        status,
        salaryRange,
      }) => ({
        url: `/jobs?page=${page}&limit=${limit}${
          search === '' ? '' : `&search=${search}`
        }&sortField=${sortField}&sortValue=${sortValue}${
          status === 'all' ? '' : `&status=${status}`
        }${salaryRange === 'all' ? '' : `&salaryRange=${salaryRange}`}`,
        method: 'GET',
      }),
    }),

    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: 'DELETE',
      }),
    }),
    changeJobStatus: builder.mutation({
      query: (data) => ({
        url: `/jobs/change-status/`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchJobsQuery,
  useDeleteJobMutation,
  useChangeJobStatusMutation,
} = jobsApi;
