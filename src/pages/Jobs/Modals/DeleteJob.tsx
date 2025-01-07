import { RootState } from '@/app/store';
import { useDeleteJobMutation } from '@/features/jobs/jobsApi';
import { deleteJobFromRedux, setJobId } from '@/features/jobs/jobsSlice';
import isApiResponseError from '@/utils/isApiResponseError';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React, { SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const DeleteJob = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { jobId } = useSelector((state: RootState) => state.jobs);

  const [deleteJob, { data: response, isLoading, isError, error, isSuccess }] =
    useDeleteJobMutation();

  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    deleteJob(jobId!);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(deleteJobFromRedux());
      toast.success(response?.message || 'Job deleted successfully!');
      dispatch(setJobId(null));
      setOpen(false);
    }
    if (isError) {
      if (isApiResponseError(error)) {
        toast.error(error.data.message);
      }
    }
  }, [isError, isSuccess, error, response]);

  return (
    <Dialog size="sm" open={open} handler={() => !isLoading && setOpen(false)}>
      <DialogHeader className="justify-between">
        <Typography className="font-medium capitalize">Confirmation</Typography>
        <Typography>
          <MdClose
            className="w-5 h-5 cursor-pointer text-gray-700 hover:text-gray-800"
            onClick={() => !isLoading && setOpen(false)}
          />
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography variant="h6">
          Are you sure want to delete this job?
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button
          size="sm"
          fullWidth
          color="red"
          id="primary-btn"
          className="w-full flex items-center justify-center py-2.5"
          onClick={handleDeleteUser}
          loading={isLoading}
          disabled={isLoading}
        >
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteJob;
