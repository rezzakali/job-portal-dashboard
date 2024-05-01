import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import React, { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-primaryColor">
      <header className="bg-secondaryColor" onClick={toggleSidebar}>
        <Navigation />
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-width duration-500 ${
            isSidebarOpen ? 'w-[290px]' : 'w-0'
          }`}
        >
          {isSidebarOpen && <Sidebar />}
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-scroll p-3" id="customScrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
