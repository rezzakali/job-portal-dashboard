import apiSlice from '@/features/api/apiSlice';

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: ({ page, limit, search, role }) => ({
        url: `/users?page=${page}&limit=${limit}${
          search === '' ? '' : `&search=${search}`
        }${role === 'all' ? '' : `&role=${role}`}`,
        method: 'GET',
      }),
    }),

    addUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: 'POST',
        body: data,
      }),
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    changeRole: builder.mutation({
      query: (data) => ({
        url: `/users/change-role`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useEditUserMutation,
  useFetchUsersQuery,
  useAddUserMutation,
  useChangeRoleMutation,
  useDeleteUserMutation,
} = usersApi;
