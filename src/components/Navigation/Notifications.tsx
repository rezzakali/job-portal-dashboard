import { Badge } from '@material-tailwind/react';
import { IoNotificationsOutline } from 'react-icons/io5';

const Notifications = () => {
  return (
    <Badge content={2} className="border-1 shadow-none cursor-pointer">
      <IoNotificationsOutline className="w-5 h-5" />
    </Badge>
  );
};

export default Notifications;
