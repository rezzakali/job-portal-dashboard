import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import React, { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-secondaryColor">
      <header
        className="bg-secondaryColor h-[40px] fixed top-0 right-0 z-20 w-full"
        onClick={toggleSidebar}
      >
        <Navigation
          isMenuOpen={isSidebarOpen}
          setIsMenuOpen={setIsSidebarOpen}
        />
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'w-[20%]' : 'w-0'
          } mt-[60px] h-[calc(100vh-40px)] bg-primaryBg shadow-md transition-display ease-in-out duration-300`}
        >
          <Sidebar />
        </div>

        {/* Main content area */}
        <main
          className="mt-[50px] h-[calc(100vh-40px)] overflow-y-scroll p-3 w-full"
          id="custom-scrollbar"
        >
          {children}
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            containerStyle={{
              zIndex: 10000,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Layout;
