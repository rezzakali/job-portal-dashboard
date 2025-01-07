import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateInterface {
  page: number;
}
const initialState: UserStateInterface = {
  page: 1,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});
export const { setPage } = usersSlice.actions;

export default usersSlice.reducer;
