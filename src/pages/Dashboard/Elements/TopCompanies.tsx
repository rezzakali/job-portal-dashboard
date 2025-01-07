import { useFetchDashboardTopComapaniesQuery } from '@/features/dashboard/dashboardApi';
import isApiResponseError from '@/utils/isApiResponseError';
import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

interface StateInterface {
  _id: string;
  jobs: number;
}

const TopCompanies = () => {
  const [infos, setInfos] = useState<StateInterface[]>([]);

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchDashboardTopComapaniesQuery(null);

  useEffect(() => {
    if (!isLoading && isSuccess && response) {
      setInfos(response.data);
    }
  }, [isLoading, isSuccess, response]);

  return (
    <React.Fragment>
      <Typography variant="lead" className="border-b mt-4">
        Top Companies
      </Typography>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && isApiResponseError(error) && (
        <Typography>{error.data.message}</Typography>
      )}
      {!isLoading && !isError && infos?.length === 0 && (
        <Typography>No applications available</Typography>
      )}

      <div className="grid grid-cols-4 gap-3 mt-2">
        {!isLoading &&
          !isError &&
          infos?.length !== 0 &&
          infos.map((item, index) => (
            <div key={index} className="p-3 rounded bg-white">
              <Typography variant="h6">Company : {item._id}</Typography>
              <Typography className="font-semibold">
                Jobs : {item.jobs}
              </Typography>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default TopCompanies;
