import { RootState } from '@/app/store';
import { useDeleteUserMutation } from '@/features/users/usersApi';
import { deleteUserFromRedux, setUserId } from '@/features/users/usersSlice';
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

const DeleteUser = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { userId } = useSelector((state: RootState) => state.user);

  const [deleteUser, { data: response, isLoading, isError, error, isSuccess }] =
    useDeleteUserMutation();

  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    deleteUser(userId!);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(deleteUserFromRedux());
      toast.success(response?.message || 'User deleted successfully!');
      dispatch(setUserId(null));
      setOpen(false);
    }
    if (isError) {
      if (isApiResponseError(error)) {
        toast.error(error.data.message);
      }
    }
  }, [isError, isSuccess, error, response]);

  return (
    <Dialog
      placeholder={undefined}
      size="sm"
      open={open}
      handler={() => !isLoading && setOpen(false)}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <DialogHeader
        placeholder={undefined}
        className="justify-between"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="font-medium capitalize"
        >
          User delete confirmation
        </Typography>
        <Typography
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
        >
          <MdClose
            className="w-5 h-5 cursor-pointer text-gray-700 hover:text-gray-800"
            onClick={() => !isLoading && setOpen(false)}
          />
        </Typography>
      </DialogHeader>
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          variant="h6"
        >
          Are you sure want to delete this user?
        </Typography>
      </DialogBody>
      <DialogFooter
        placeholder={undefined}
        className=""
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          size="sm"
          fullWidth
          placeholder={undefined}
          color="red"
          id="primary-btn"
          className="w-full flex items-center justify-center py-2.5"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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

export default DeleteUser;
