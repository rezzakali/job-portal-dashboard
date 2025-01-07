import { useFetchDashboardRecentApplicationsQuery } from '@/features/dashboard/dashboardApi';
import ChipComponent from '@/ui/ChipComponent';
import isApiResponseError from '@/utils/isApiResponseError';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface StateInterface {
  _id: string;
  jobId: { title: string };
  userId: { email: string };
  status: string;
  appliedAt: string;
}

const RecentApplications = () => {
  const [infos, setInfos] = useState<StateInterface[]>([]);

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchDashboardRecentApplicationsQuery(null);

  useEffect(() => {
    if (!isLoading && isSuccess && response) {
      setInfos(response.data);
    }
  }, [isLoading, isSuccess, response]);

  return (
    <React.Fragment>
      <Typography variant="lead" className="border-b mt-4">
        Recent Applications
      </Typography>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && isApiResponseError(error) && (
        <Typography>{error.data.message}</Typography>
      )}
      {!isLoading && !isError && infos?.length === 0 && (
        <Typography>No applications available</Typography>
      )}

      <div className="grid grid-cols-4 gap-3 mt-3">
        {!isLoading &&
          !isError &&
          infos?.length !== 0 &&
          infos?.map((item, index) => {
            return (
              <div key={index} className="rounded bg-white p-3 space-y-2">
                <Typography variant="paragraph" className="font-normal">
                  {item.jobId.title}
                </Typography>
                <Typography className="font-semibold">
                  {item.userId.email}
                </Typography>
                <Typography className="flex items-center justify-between">
                  {moment(item.appliedAt).format('lll')}{' '}
                  <ChipComponent status={item.status} />
                </Typography>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default RecentApplications;
