import { UserInterface } from '@/pages/Users/Users.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateInterface {
  page: number;
  limit: number;
  statusFilter: string;
  sortField: string;
  sortValue: number;
  users: UserInterface[];
}
const initialState: UserStateInterface = {
  page: 1,
  limit: 10,
  statusFilter: 'all',
  sortField: 'name',
  sortValue: -1,
  users: [],
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
    setSortField: (state, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
    setSortValue: (state, action: PayloadAction<number>) => {
      state.sortValue = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserInterface[]>) => {
      state.users = action.payload;
    },
  },
});
export const { setPage } = usersSlice.actions;

export default usersSlice.reducer;
