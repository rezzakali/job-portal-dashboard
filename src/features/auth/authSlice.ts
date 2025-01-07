import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateInterface {
  isLogin: boolean;
}
const initialState: UserStateInterface = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});
export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
