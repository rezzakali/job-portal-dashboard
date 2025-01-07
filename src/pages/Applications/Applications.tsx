import { RootState } from '@/app/store';
import BreadCrumbComponent from '@/ui/BreadcrumbComponent';
import { Chip } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import ApplicationsTable from './ApplicationsTable';

const Applications = () => {
  const { totalApplications } = useSelector(
    (state: RootState) => state.applications
  );

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <BreadCrumbComponent />
        <Chip
          value={`Total Applications : ${totalApplications}`}
          variant="ghost"
          className="rounded-full capitalize"
          color="pink"
        />
      </div>
      <ApplicationsTable />
    </React.Fragment>
  );
};

export default Applications;
