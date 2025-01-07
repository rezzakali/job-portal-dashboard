import React from 'react';
import RecentApplications from './Elements/RecentApplications';
import RecentJobs from './Elements/RecentJobs';
import Summery from './Elements/Summery';
import TopCompanies from './Elements/TopCompanies';

const Dashaboard = () => {
  return (
    <React.Fragment>
      <Summery />
      <RecentJobs />
      <RecentApplications />
      <TopCompanies />
    </React.Fragment>
  );
};

export default Dashaboard;
