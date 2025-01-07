import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useCheckAdminAuthQuery } from '@/features/auth/authApi';
import { setLogin } from '@/features/auth/authSlice';
import Login from '@/pageElements/Login/Login';
import { Spinner } from '@material-tailwind/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // fetch admin auth using RTK Query
  const {
    data: response,
    isSuccess,
    isError,
    isLoading,
  } = useCheckAdminAuthQuery(null);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && response) {
      dispatch(setLogin(true));
      navigate('/', { replace: true });
    }
    if (isError) {
      dispatch(setLogin(false));
    }
  }, [response, isSuccess, isError]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner className="w-12 h-12 text-primaryTeal" />
        </div>
      )}
      {!isLoading && pathname !== '/login' ? (
        <div className="flex flex-col h-screen overflow-hidden bg-secondaryColor">
          <header className="bg-secondaryColor h-[40px] fixed top-0 right-0 z-20 w-full">
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
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
};

export default Layout;
