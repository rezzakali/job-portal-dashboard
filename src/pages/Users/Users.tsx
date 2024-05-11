import BreadCrumbComponent from '@/ui/BreadcrumbComponent';
import { Button } from '@material-tailwind/react';
import React from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import FilterComponent from './Elements/FilterComponent';
import UsersLists from './UsersLists';

const Users = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <BreadCrumbComponent />
        <Button
          className="flex items-center gap-3"
          size="sm"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          id="primary-btn"
        >
          <RiUserAddLine strokeWidth={2} className="h-4 w-4" /> Add member
        </Button>
      </div>
      <div className="flex items-center justify-between my-3">
        <FilterComponent />
      </div>
      <UsersLists />
    </React.Fragment>
  );
};

export default Users;
