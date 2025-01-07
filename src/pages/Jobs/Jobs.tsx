import { RootState } from '@/app/store';
import BreadCrumbComponent from '@/ui/BreadcrumbComponent';
import { Chip } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import JobFilterComponent from './Elements/JobFilterComponent';
import JobsTable from './JobsTable';

const Jobs = () => {
  const { totalJobs } = useSelector((state: RootState) => state.jobs);

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <BreadCrumbComponent />
        <Chip
          value={`Total Jobs : ${totalJobs}`}
          variant="ghost"
          className="rounded-full capitalize"
          color="pink"
        />
      </div>
      <JobFilterComponent />
      <JobsTable />
    </React.Fragment>
  );
};

export default Jobs;
