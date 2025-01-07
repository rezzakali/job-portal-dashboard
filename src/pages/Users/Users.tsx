import BreadCrumbComponent from '@/ui/BreadcrumbComponent';
import React from 'react';
import FilterComponent from './Elements/FilterComponent';
import UsersLists from './UsersLists';

const Users = () => {
  return (
    <React.Fragment>
      <BreadCrumbComponent />

      <div className="flex items-center justify-between my-3">
        <FilterComponent />
      </div>
      <UsersLists />
    </React.Fragment>
  );
};

export default Users;
