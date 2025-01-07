import { RootState } from '@/app/store';
import PaginationComponent from '@/components/PaginationComponent';
import { useFetchApplicationsQuery } from '@/features/applicantions/applicationsApi';
import {
  setApplications,
  setLimit,
  setPage,
  setSelectedApplication,
} from '@/features/applicantions/applicationsSlice';
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
import React, { useEffect, useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationInterface } from './Applications.interface';
import ApplicantsModal from './Modals/ApplicantsModal';

const TABLE_HEAD = ['job/company', 'total applied', 'status', 'actions'];

const ApplicationsTable = () => {
  const { page, limit, status, applications } = useSelector(
    (state: RootState) => state.applications
  );

  const [sortField, setSortField] = useState<string>('appliedAt');
  const [sortValue, setSortValue] = useState<1 | -1>(1);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);

  const {
    data: response,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useFetchApplicationsQuery({
    page,
    limit,
    status,
    sortField,
    sortValue,
  });

  const dispatch = useDispatch();

  const sortHandler = (field: string) => {
    setSortField(field);
    setSortValue(sortValue === 1 ? -1 : 1);
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleLimit = (limit: number) => {
    dispatch(setLimit(limit));
  };

  useEffect(() => {
    if (!isFetching && isSuccess && response) {
      dispatch(setApplications(response.applications));
    }
  }, [isFetching, isSuccess, response]);

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
                      className={`font-semibold text-gray-600 flex items-center space-x-1 capitalize`}
                      onClick={() => sortHandler(head)}
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
                  <td colSpan={4}>
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
                  {!isFetching && !isError && applications?.length === 0 && (
                    <DataNotFound />
                  )}
                </td>
              </tr>

              {!isFetching &&
                !isError &&
                applications?.length !== 0 &&
                applications!.map(
                  (application: ApplicationInterface, index: React.Key) => {
                    const { _id, status, applicantsCount, company, jobTitle } =
                      application;

                    const isLast = index === applications.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={_id} className="even:bg-blue-gray-50/50">
                        <td className={classes}>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {jobTitle}
                            </Typography>

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {company}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {applicantsCount}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <ChipComponent status={status} />
                        </td>
                        <td>
                          <div className="flex items-center justify-start gap-2">
                            <Tooltip
                              content="Applicants"
                              className="bg-gray-700 rounded"
                            >
                              <Typography
                                className="w-5 h-5 cursor-pointer mt-1"
                                onClick={() => {
                                  dispatch(setSelectedApplication(_id));
                                  setApplicantsModalOpen(true);
                                }}
                              >
                                <BsEye className="w-5 h-5 hover:text-gray-500" />
                              </Typography>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
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
      {applicantsModalOpen && (
        <ApplicantsModal
          open={applicantsModalOpen}
          setOpen={setApplicantsModalOpen}
        />
      )}
    </React.Fragment>
  );
};

export default ApplicationsTable;
