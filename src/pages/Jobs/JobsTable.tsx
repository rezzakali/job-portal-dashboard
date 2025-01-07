import { RootState } from '@/app/store';
import PaginationComponent from '@/components/PaginationComponent';
import { useFetchJobsQuery } from '@/features/jobs/jobsApi';
import {
  setJobId,
  setJobs,
  setLimit,
  setPage,
  setSelectedJob,
  setTotalJobs,
} from '@/features/jobs/jobsSlice';
import ChipComponent from '@/ui/ChipComponent';
import DataNotFound from '@/ui/DataNotFound';
import isApiResponseError from '@/utils/isApiResponseError';
import {
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { TbListDetails } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import ChangeJobStatus from './Elements/ChangeJobStatus';
import { JobsInterface } from './Jobs.interface';
import DeleteJob from './Modals/DeleteJob';
import DetailsModal from './Modals/DetailsModal';

const TABLE_HEAD = [
  'job',
  'location',
  'salary',
  'createdAt/createdBy',
  'status',
  'actions',
];

const showIconFields = [
  'job',
  'salary',
  'createdAt/createdBy',
  'status',
  'location',
];

const JobsTable = () => {
  const { page, limit, jobs, searchValue, status, salaryRange } = useSelector(
    (state: RootState) => state.jobs
  );

  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortValue, setSortValue] = useState<1 | -1>(1);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [moreModalOpen, setMoreOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    data: response,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useFetchJobsQuery({
    page,
    limit,
    sortField,
    sortValue,
    search: searchValue,
    status,
    salaryRange,
  });

  const sortHandler = (field: string) => {
    if (
      sortField ===
      (field === 'job'
        ? 'title'
        : field === 'createdAt/createdBy'
        ? 'createdAt'
        : field)
    ) {
      setSortValue(sortValue === 1 ? -1 : 1);
    } else {
      setSortField(
        field === 'job'
          ? 'title'
          : field === 'createdAt/createdBy'
          ? 'createdAt'
          : field
      );
      setSortValue(1);
    }
  };

  const showIcon = (field: string) => {
    if (!showIconFields.includes(field)) return;

    if (
      sortField ===
      (field === 'job'
        ? 'title'
        : field === 'createdAt/createdBy'
        ? 'createdAt'
        : field)
    ) {
      return sortValue === 1 ? (
        <IoMdArrowDropup className="h-4 w-4" />
      ) : (
        <IoMdArrowDropdown className="h-4 w-4" />
      );
    }

    return <IoMdArrowDropdown className="h-4 w-4" />;
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleLimit = (limit: number) => {
    dispatch(setLimit(limit));
  };

  useEffect(() => {
    if (isSuccess && response) {
      dispatch(setTotalJobs(response.count));
      dispatch(setJobs(response.data));
    }
  }, [isSuccess, response]);

  return (
    <React.Fragment>
      <Card className="h-full w-full bg-primaryColor">
        <CardBody
          className="p-0 max-h-[100vh] overflow-y-scroll rounded-md"
          id="custom-scrollbar"
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
                      variant="small"
                      className={`font-semibold text-gray-600 flex items-center space-x-1 ${
                        showIcon(head) && 'cursor-pointer'
                      }`}
                      onClick={() =>
                        showIconFields.includes(head) && sortHandler(head)
                      }
                    >
                      {head} {showIcon(head)}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isFetching && (
                <tr>
                  <td colSpan={6}>
                    <Typography className="flex items-center justify-center mt-auto h-[50vh] gap-2">
                      <Spinner fontSize={10} /> Loading...
                    </Typography>
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
                  {!isFetching && !isError && jobs?.length === 0 && (
                    <DataNotFound />
                  )}
                </td>
              </tr>

              {!isFetching &&
                !isError &&
                jobs?.length !== 0 &&
                jobs!.map((job: JobsInterface, index: React.Key) => {
                  const {
                    company,
                    location,
                    salary,
                    status,
                    title,
                    _id,
                    createdAt,
                    createdBy,
                  } = job;
                  const isLast = index === jobs.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={_id} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {company}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {location}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {salary?.toFixed(2)}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moment(new Date(createdAt)).fromNow()} <br />
                          {createdBy?.email}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <ChipComponent status={status} />
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <ChangeJobStatus jobId={_id} status={status} />
                          <Tooltip
                            content="More"
                            className="bg-gray-700 rounded"
                          >
                            <Typography
                              className="w-5 h-5 cursor-pointer mt-1"
                              onClick={() => {
                                dispatch(setSelectedJob(_id));
                                setMoreOpen(true);
                              }}
                            >
                              <TbListDetails className="w-4 h-4" />
                            </Typography>
                          </Tooltip>
                          <Tooltip
                            content="Delete"
                            className="bg-gray-700 rounded"
                          >
                            <Typography
                              className="w-5 h-5 cursor-pointer mt-1"
                              onClick={() => {
                                dispatch(setJobId(_id));
                                setDeleteModalOpen(true);
                              }}
                            >
                              <FiTrash className="w-4 h-4 text-red-300 hover:text-red-500" />
                            </Typography>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 py-0">
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
      {setDeleteModalOpen && (
        <DeleteJob open={deleteModalOpen} setOpen={setDeleteModalOpen} />
      )}
      {moreModalOpen && (
        <DetailsModal open={moreModalOpen} setOpen={setMoreOpen} />
      )}
    </React.Fragment>
  );
};

export default JobsTable;
