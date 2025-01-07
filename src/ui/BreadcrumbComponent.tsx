import { Breadcrumbs, Typography } from '@material-tailwind/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbComponent = () => {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.toLowerCase().split('/');
  breadcrumbs.shift();
  let currentRoute = '';

  return (
    <Breadcrumbs style={{ margin: '.5rem 0' }} className="bg-transparent">
      <Link to="/">
        <Typography
          placeholder={undefined}
          variant="h6"
          style={{ cursor: 'pointer' }}
        >
          Dashboard
        </Typography>
      </Link>

      {breadcrumbs.map((item, index) => {
        currentRoute = `${currentRoute}/${item}`;
        const isLast = breadcrumbs.length - 1;
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <Typography
                placeholder={undefined}
                variant="h6"
                className="capitalize cursor-pointer"
              >
                {item}
              </Typography>
            ) : (
              <Link to={currentRoute}>
                <Typography
                  placeholder={undefined}
                  variant="h6"
                  className="capitalize cursor-pointer"
                >
                  {item}
                </Typography>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbComponent;
