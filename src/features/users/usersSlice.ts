import { UserInterface } from '@/pages/Users/Users.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateInterface {
  page: number;
  limit: number;
  statusFilter: string;
  users: UserInterface[];
  value: string;
  searchValue: string;
  role: string;
  userId: string | null;
}
const initialState: UserStateInterface = {
  page: 1,
  limit: 10,
  statusFilter: 'all',
  users: [],
  value: '',
  searchValue: '',
  role: 'all',
  userId: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserInterface[]>) => {
      state.users = action.payload;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    roleChange: (
      state,
      action: PayloadAction<{ userId: string; role: string }>
    ) => {
      const { role, userId } = action.payload;
      const foundedUser = state.users.find((user) => user._id === userId);
      if (foundedUser) {
        foundedUser.role = role;
      }
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    deleteUserFromRedux: (state) => {
      const userId = state.userId;
      state.users = state.users.filter((user) => user._id !== userId);
    },
  },
});
export const {
  setPage,
  setLimit,
  setStatusFilter,
  setUsers,
  setSearchValue,
  setValue,
  setRole,
  roleChange,
  setUserId,
  deleteUserFromRedux,
} = usersSlice.actions;

export default usersSlice.reducer;
