import { ApplicationInterface } from '@/pages/Applications/Applications.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateInterface {
  page: number;
  limit: number;
  applications: ApplicationInterface[];
  selectedApplication: ApplicationInterface | null;
  totalApplications: number;
  searchValue: string;
  status: string;
  applicationId: string | null;
}
const initialState: UserStateInterface = {
  page: 1,
  limit: 10,
  applications: [],
  selectedApplication: null,
  totalApplications: 0,
  searchValue: '',
  status: 'all',
  applicationId: null,
};

export const jobsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },

    setApplications: (state, action: PayloadAction<ApplicationInterface[]>) => {
      state.totalApplications = action.payload.length;
      state.applications = action.payload;
    },

    setSelectedApplication: (state, action: PayloadAction<string>) => {
      const applicationId = action.payload;
      const foundedApplication = state.applications.find(
        (application) => application._id === applicationId
      );
      if (foundedApplication) {
        state.selectedApplication = foundedApplication;
      }
    },

    // setTotalApplications: (state, action: PayloadAction<number>) => {
    //   state.totalApplications = action.payload;
    // },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },

    setApplicationId: (state, action: PayloadAction<string | null>) => {
      state.applicationId = action.payload;
    },
    deleteApplicationFromRedux: (state) => {
      const applicationId = state.applicationId;
      state.applications = state.applications.filter(
        (application) => application._id !== applicationId
      );
    },

    // applicationStatusChange: (
    //   state,
    //   action: PayloadAction<{ applicationId: string; status: string }>
    // ) => {
    //   const { applicationId, status } = action.payload;
    //   const foundedJobIndex = state.applications.findIndex(
    //     (application) => application._id === applicationId
    //   );
    //   if (foundedJobIndex !== -1) {
    //     state.applications[foundedJobIndex].status = status;
    //   }
    // },
  },
});
export const {
  setPage,
  setLimit,
  setApplications,
  setSearchValue,
  setStatus,
  setApplicationId,
  deleteApplicationFromRedux,
  // applicationStatusChange,
  // setTotalApplications,
  setSelectedApplication,
} = jobsSlice.actions;

export default jobsSlice.reducer;
