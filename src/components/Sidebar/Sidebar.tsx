import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { FiUsers } from 'react-icons/fi';
import { IoAnalytics, IoBriefcaseOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const sidebarItems = [
  {
    title: 'Dashboard',
    link: '/',
    icon: <MdOutlineDashboardCustomize className="text-lg text-teal-500" />,
  },
  {
    title: 'Analytics',
    link: '/analytics',
    icon: <IoAnalytics className="text-lg text-yellow-500" />,
  },
  {
    title: 'Applications',
    link: '/applications',
    icon: <PiUsersThree className="text-lg text-green-500" />,
  },
  {
    title: 'Jobs',
    link: '/jobs',
    icon: <IoBriefcaseOutline className="text-lg text-blue-500" />,
  },

  {
    title: 'Users',
    link: '/users',
    icon: <FiUsers className="text-lg text-red-500" />,
  },
];

const Sidebar = () => {
  return (
    <Card
      className="h-[calc(100vh-60px)] w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 rounded-none overflow-y-scroll"
      id="custom-scrollbar"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="p-1"
      >
        {sidebarItems.map((item) => {
          return (
            <Link to={item.link}>
              <ListItem
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="p-2 hover:rounded rounded"
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {item.icon}
                </ListItemPrefix>
                {item.title}
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Card>
  );
};

export default Sidebar;
