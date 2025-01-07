import { useFetchDashboardSummeryQuery } from '@/features/dashboard/dashboardApi';
import isApiResponseError from '@/utils/isApiResponseError';
import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

const Summery = () => {
  const [infos, setInfos] = useState<{ title: string; count: number }[]>([]);

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchDashboardSummeryQuery(null);

  useEffect(() => {
    if (!isLoading && isSuccess && response) {
      setInfos(response.data);
    }
  }, [isLoading, isSuccess, response]);

  return (
    <React.Fragment>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && isApiResponseError(error) && (
        <Typography>{error.data.message}</Typography>
      )}
      {!isLoading && !isError && infos?.length === 0 && (
        <Typography>No data available</Typography>
      )}
      <Typography variant="lead" className="border-b">
        Summery
      </Typography>
      <div className="grid grid-cols-4 gap-3 mt-3">
        {!isLoading &&
          !isError &&
          infos?.length !== 0 &&
          infos?.map((item, index) => {
            return (
              <div key={index} className="rounded bg-white p-3 space-y-2">
                <Typography variant="paragraph" className="font-normal">
                  {item.title}
                </Typography>
                <Typography className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black font-semibold text-lg">
                  {item.count}
                </Typography>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Summery;
