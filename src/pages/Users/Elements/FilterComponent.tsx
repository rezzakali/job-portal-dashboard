import { RootState } from '@/app/store';
import { setRole } from '@/features/users/usersSlice';
import { Option, Select } from '@material-tailwind/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchUserInput from './SearchUserInput';

const FilterComponent = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="flex items-center justify-end space-x-2 w-full">
        <SearchUserInput />

        <div className="bg-primaryColor [&>*:first-child]:min-w-32">
          <Select
            label="Role"
            placeholder={undefined}
            value={role}
            onChange={(value) => {
              if (typeof value === 'string') {
                dispatch(setRole(value));
              }
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Option value="all">All</Option>
            <Option value="job seeker">Job Seeker</Option>
            <Option value="employer">Employer</Option>
          </Select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterComponent;
