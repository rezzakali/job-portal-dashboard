import { Breadcrumbs, Typography } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbComponent = () => {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.toLowerCase().split('/');
  breadcrumbs.shift();
  let currentRoute = '';
  return (
    <Breadcrumbs
      placeholder={undefined}
      style={{ margin: '.5rem 0' }}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className="bg-transparent"
    >
      <Link to="/">
        <Typography
          placeholder={undefined}
          variant="h6"
          style={{ cursor: 'pointer' }}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Dashboard
        </Typography>
      </Link>

      {breadcrumbs.map((item, index) => {
        currentRoute = `${currentRoute}/${item}`;
        return (
          <Link to={currentRoute} key={index}>
            <Typography
              placeholder={undefined}
              variant="h6"
              className={`capitalize cursor-pointer ${
                index === breadcrumbs.length - 1 && '#1D5CCD'
              }`}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {item}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbComponent;
