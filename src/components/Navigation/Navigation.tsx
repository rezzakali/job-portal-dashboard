import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
} from '@nextui-org/react';
import React from 'react';
import { CgClose } from 'react-icons/cg';
import { TbMenuDeep } from 'react-icons/tb';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      className="bg-primaryColor"
      maxWidth="full"
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="grid grid-cols-5 w-full">
        <div className="col-span-1 gap-2 flex items-center">
          <h3 className="text-xl font-semibold cursor-pointer">
            {isMenuOpen ? (
              <CgClose onClick={() => setIsMenuOpen(false)} />
            ) : (
              <TbMenuDeep onClick={() => setIsMenuOpen(true)} />
            )}
          </h3>

          <h3 className="text-xl font-semibold">Job Supply</h3>
        </div>
        <NavbarContent as="div" justify="end" className="col-span-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
