import { Navbar } from '@material-tailwind/react';
import React from 'react';
import { CgClose } from 'react-icons/cg';
import { TbMenuDeep } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import ProfileMenu from './ProfileMenu';

const Navigation = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Navbar
      className="sticky top-0 inset-0 z-50 max-w-full rounded-none py-1 shadow-none px-4 border-none bg-primaryColor h-[3rem]"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-2">
          {isMenuOpen ? (
            <CgClose
              onClick={() => setIsMenuOpen(false)}
              className=" cursor-pointer"
            />
          ) : (
            <TbMenuDeep
              onClick={() => setIsMenuOpen(true)}
              className=" cursor-pointer"
            />
          )}
          <Link to="/" className="mr-4 cursor-pointer py-1.5 font-medium">
            Job Supply
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Notifications />
          <ProfileMenu />
        </div>
      </div>
    </Navbar>
  );
};

export default Navigation;
