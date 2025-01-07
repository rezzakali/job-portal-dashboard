import { useChangeJobStatusMutation } from '@/features/jobs/jobsApi';
import { jobStatusChange } from '@/features/jobs/jobsSlice';
import isApiResponseError from '@/utils/isApiResponseError';
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

const statuses = ['open', 'closed'];

const ChangeJobStatus = ({
  jobId,
  status,
}: {
  jobId: string;
  status: string;
}) => {
  const [savedStatus, setSavedStatus] = useState<string>('');

  const dispatch = useDispatch();

  const [
    changeJobStatus,
    { data: response, isLoading, isSuccess, isError, error },
  ] = useChangeJobStatusMutation();

  // handler to change status
  const handleChangeRole = ({ status }: { status: string }) => {
    setSavedStatus(status);
    const data = {
      jobId,
      status,
    };
    changeJobStatus(data);
  };

  useEffect(() => {
    if (isSuccess && response) {
      dispatch(jobStatusChange({ jobId, status: savedStatus }));
      toast.success(response.message || 'Job status changed successfully');
    }
    if (isError) {
      if (isApiResponseError(error)) {
        toast.error(error.data.message);
      }
    }
  }, [isSuccess, response, isError, error]);

  return (
    <Menu placement="left-start">
      <Tooltip content="Change status" className="rounded bg-gray-700">
        <MenuHandler>
          <Typography className="cursor-pointer">
            <HiOutlineDotsVertical />
          </Typography>
        </MenuHandler>
      </Tooltip>
      <MenuList>
        {statuses.map((item) => {
          const isDisabled = item !== status;
          return (
            <MenuItem
              key={item}
              className="capitalize"
              onClick={() => handleChangeRole({ status: item })}
              disabled={isLoading || !isDisabled}
            >
              {item}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ChangeJobStatus;
