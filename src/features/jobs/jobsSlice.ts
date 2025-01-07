import { JobsInterface } from '@/pages/Jobs/Jobs.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateInterface {
  page: number;
  limit: number;
  jobs: JobsInterface[];
  selectedJob: JobsInterface | null;
  totalJobs: number;
  searchValue: string;
  status: string;
  salaryRange: string;
  jobId: string | null;
}
const initialState: UserStateInterface = {
  page: 1,
  limit: 10,
  jobs: [],
  selectedJob: null,
  totalJobs: 0,
  searchValue: '',
  status: 'all',
  salaryRange: 'all',
  jobId: null,
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

    setJobs: (state, action: PayloadAction<JobsInterface[]>) => {
      state.jobs = action.payload;
    },

    setSelectedJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      const foundedJob = state.jobs.find((job) => job._id === jobId);
      if (foundedJob) {
        state.selectedJob = foundedJob;
      }
    },

    setTotalJobs: (state, action: PayloadAction<number>) => {
      state.totalJobs = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSalaryRange: (state, action: PayloadAction<string>) => {
      state.salaryRange = action.payload;
    },
    setJobId: (state, action: PayloadAction<string | null>) => {
      state.jobId = action.payload;
    },
    deleteJobFromRedux: (state) => {
      const jobId = state.jobId;
      state.jobs = state.jobs.filter((job) => job._id !== jobId);
    },

    jobStatusChange: (
      state,
      action: PayloadAction<{ jobId: string; status: string }>
    ) => {
      const { jobId, status } = action.payload;
      const foundedJobIndex = state.jobs.findIndex((job) => job._id === jobId);
      if (foundedJobIndex !== -1) {
        state.jobs[foundedJobIndex].status = status;
      }
    },
  },
});
export const {
  setPage,
  setLimit,
  setJobs,
  setSearchValue,
  setStatus,
  setSalaryRange,
  setJobId,
  deleteJobFromRedux,
  jobStatusChange,
  setTotalJobs,
  setSelectedJob,
} = jobsSlice.actions;

export default jobsSlice.reducer;
