import { RootState } from '@/app/store';
import { setSalaryRange, setStatus } from '@/features/jobs/jobsSlice';
import { Option, Select } from '@material-tailwind/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobSearchInput from './JobSearchInput';

const salaryRanges = [
  { range: 'all' },
  { range: '5k-10k' },
  { range: '10k-20k' },
  { range: '25k-40k' },
  { range: '45k-65k' },
  { range: '70k-100k' },
  { range: '110k-150k' },
];

const JobFilterComponent = () => {
  const { status, salaryRange } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="flex items-center justify-end space-x-2 w-full mb-1.5">
        <JobSearchInput />

        <div className="bg-primaryColor [&>*:first-child]:min-w-40">
          <Select
            label="Sort By Salary"
            value={salaryRange}
            onChange={(value) => {
              if (typeof value === 'string') {
                dispatch(setSalaryRange(value));
              }
            }}
          >
            {salaryRanges.map((range, index) => (
              <Option key={index} value={range.range}>
                {range.range}
              </Option>
            ))}
          </Select>
        </div>
        <div className="bg-primaryColor [&>*:first-child]:min-w-32">
          <Select
            label="Status"
            value={status}
            onChange={(value) => {
              if (typeof value === 'string') {
                dispatch(setStatus(value));
              }
            }}
          >
            <Option value="all">All</Option>
            <Option value="open">Open</Option>
            <Option value="closed">Closed</Option>
          </Select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobFilterComponent;
