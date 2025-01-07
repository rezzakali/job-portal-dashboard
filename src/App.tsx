import Layout from '@/components/Layout/Layout';
import Analytics from '@/pages/Analytics/Analytics';
import Applications from '@/pages/Applications/Applications';
import Dashaboard from '@/pages/Dashboard/Dashaboard';
import Jobs from '@/pages/Jobs/Jobs';
import Users from '@/pages/Users/Users';
import Login from '@/pages/login/index';
import NotFound from '@/pages/not-found/index';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './protect_routes/PublicRoute';

const App = () => {
  return (
    <Layout>
      <Routes>
        {/* Private routes */}
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/" element={<Dashaboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/jobs" element={<Jobs />} />
        {/* </Route> */}

        {/* Login  */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
