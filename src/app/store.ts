import apiSlice from '@/features/api/apiSlice';
import applicationReducer from '@/features/applicantions/applicationsSlice';
import authReducer from '@/features/auth/authSlice';
import dashboardReducer from '@/features/dashboard/dashboardSlice';
import jobsReducer from '@/features/jobs/jobsSlice';
import usersReducer from '@/features/users/usersSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: usersReducer,
    auth: authReducer,
    jobs: jobsReducer,
    applications: applicationReducer,
    dashboard: dashboardReducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
