import { RootState } from '@/app/store';
import PaginationComponent from '@/components/PaginationComponent';
import {
  useChangeRoleMutation,
  useFetchUsersQuery,
} from '@/features/users/usersApi';
import {
  roleChange,
  setLimit,
  setPage,
  setUserId,
  setUsers,
} from '@/features/users/usersSlice';
import ChipComponent from '@/ui/ChipComponent';
import DataNotFound from '@/ui/DataNotFound';
import isApiResponseError from '@/utils/isApiResponseError';
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiPencil } from 'react-icons/bi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import DeleteUser from './Modals/DeleteUser';
import { UserInterface } from './Users.interface';

const TABLE_HEAD = ['user', 'role', 'address', 'createdAt', 'actions'];

const roles = ['job seeker', 'employer'];

const UsersLists = () => {
  const { page, limit, users, searchValue, role } = useSelector(
    (state: RootState) => state.user
  );

  const [roleChangeData, setRoleChangeData] = useState<{
    userId: string;
    role: string;
  } | null>(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    data: response,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useFetchUsersQuery({
    page,
    limit,
    search: searchValue,
    role,
  });

  const [
    changeRole,
    {
      data: changeRoleResponse,
      isSuccess: isRoleChangingSuccess,
      error: roleChangeError,
      isError: isRoleChangingError,
    },
  ] = useChangeRoleMutation();

  // handler to change role
  const handleChangeRole = ({
    role,
    userId,
  }: {
    role: string;
    userId: string;
  }) => {
    const data = {
      userId,
      role,
    };
    setRoleChangeData(data);
    changeRole(data);
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  const handleLimit = (limit: number) => {
    dispatch(setLimit(limit));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUsers(response?.data));
    }
  }, [isSuccess, response]);

  // useEffect for change role
  useEffect(() => {
    if (isRoleChangingSuccess) {
      dispatch(roleChange(roleChangeData!));
      toast.success(changeRoleResponse?.message || 'Role changed');
    }
    if (isRoleChangingError) {
      if (isApiResponseError(roleChangeError)) {
        toast.error(roleChangeError.data.message);
      }
    }
  }, [
    isRoleChangingError,
    isRoleChangingSuccess,
    roleChangeError,
    changeRoleResponse,
  ]);

  return (
    <React.Fragment>
      <Card
        placeholder={undefined}
        className="h-full w-full bg-primaryColor"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          placeholder={undefined}
          className="p-0 max-h-[100vh] overflow-y-scroll rounded-md"
          id="custom-scrollbar"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="sticky bg-white top-0 border-b border-gray-300 p-4 font-normal z-50"
                  >
                    <Typography
                      placeholder={undefined}
                      variant="small"
                      className={`font-semibold text-gray-600 flex items-center space-x-1`}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isFetching && (
                <tr>
                  <td colSpan={5}>
                    <Spinner
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  </td>
                </tr>
              )}
              {!isFetching && isError && (
                <tr>
                  <td colSpan={5} className="text-center h-[50vh]">
                    {isApiResponseError(error) && error?.data?.message}
                  </td>
                </tr>
              )}

              <tr>
                <td colSpan={10}>
                  {!isFetching && !isError && response?.data?.length === 0 && (
                    <DataNotFound />
                  )}
                </td>
              </tr>

              {!isFetching &&
                !isError &&
                users?.length !== 0 &&
                users!.map((user: UserInterface, index: React.Key) => {
                  const { role, email, phone, createdAt, address, _id } = user;
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={'/profile.png'}
                            alt={'image'}
                            size="sm"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {email}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {phone}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={classes}>
                        <ChipComponent status={role} />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {address?.city} <br />
                          {address?.postalCode}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {moment(createdAt).format('ll')}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center justify-start space-x-2">
                          <Tooltip content="Edit User">
                            <Typography
                              className="cursor-pointer"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              <BiPencil className="h-4 w-4" />
                            </Typography>
                          </Tooltip>
                          {role !== 'super-admin' && (
                            <Tooltip content="Delete">
                              <Typography
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                className="cursor-pointer"
                                onClick={() => {
                                  dispatch(setUserId(_id));
                                  setConfirmModalOpen(true);
                                }}
                              >
                                <MdDelete className="h-4 w-4 text-red-400" />
                              </Typography>
                            </Tooltip>
                          )}
                          {role !== 'super-admin' && (
                            <Menu placement="left-start">
                              <Tooltip
                                content="Change role"
                                className="rounded"
                                placement="left-start"
                              >
                                <MenuHandler>
                                  <Typography
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    className="cursor-pointer"
                                  >
                                    <HiOutlineDotsVertical />
                                  </Typography>
                                </MenuHandler>
                              </Tooltip>
                              <MenuList
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                {roles.map((role) => (
                                  <MenuItem
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    className="capitalize"
                                    onClick={() =>
                                      handleChangeRole({ role, userId: _id })
                                    }
                                  >
                                    {role}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {!isFetching && response?.count > 10 && (
            <PaginationComponent
              totalItems={response?.count}
              itemsPerPage={limit}
              onPageChange={handlePageChange}
              handleLimit={handleLimit}
              page={page}
            />
          )}
        </CardFooter>
      </Card>
      {confirmModalOpen && (
        <DeleteUser open={confirmModalOpen} setOpen={setConfirmModalOpen} />
      )}
    </React.Fragment>
  );
};

export default UsersLists;
