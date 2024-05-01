import IconWrapper from '@/components/Sidebar/IconWrapper';
import { Listbox, ListboxItem } from '@nextui-org/react';
import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { IoAnalytics, IoBriefcaseOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import ItemCounter from './ItemCounter';

const sidebarItems = [
  {
    title: 'Dashboard',
    link: '/',
    icon: <MdOutlineDashboardCustomize className="text-lg" />,
    color: 'bg-success/10 text-success',
  },
  {
    title: 'Analytics',
    link: '/analytics',
    icon: <IoAnalytics className="text-lg" />,
    color: 'bg-default/50 text-foreground',
  },
  {
    title: 'Applications',
    link: '/applications',
    icon: <PiUsersThree className="text-lg" />,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Jobs',
    link: '/jobs',
    icon: <IoBriefcaseOutline className="text-lg" />,
    color: 'bg-secondary/10 text-secondary',
  },

  {
    title: 'Users',
    link: '/users',
    icon: <FiUsers className="text-lg" />,
    color: 'bg-warning/10 text-warning',
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Listbox
        aria-label="sidebar"
        className="divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 w-full shadow-small rounded-none h-[100vh]"
        itemClasses={{
          base: 'px-3 first:rounded-t last:rounded-b rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80',
        }}
      >
        {sidebarItems.map((item, index) => {
          return (
            <ListboxItem
              key={index}
              endContent={<ItemCounter number={6} />}
              startContent={
                <IconWrapper className={item.color}>{item.icon}</IconWrapper>
              }
              onClick={() => navigate(item.link)}
            >
              {item.title}
            </ListboxItem>
          );
        })}
      </Listbox>
    </React.Fragment>
  );
};

export default Sidebar;
