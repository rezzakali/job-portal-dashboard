import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbComponent = () => {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.toLowerCase().split('/');
  breadcrumbs.shift();
  let currentRoute = '';
  return (
    <Breadcrumbs style={{ margin: '.5rem 0' }}>
      <BreadcrumbItem href="/">
        <Link to="/">Dashboard</Link>
      </BreadcrumbItem>

      {breadcrumbs.map((item, index) => {
        currentRoute = `${currentRoute}/${item}`;
        return (
          <BreadcrumbItem key={index}>
            <Link to={currentRoute}>{item}</Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbComponent;
