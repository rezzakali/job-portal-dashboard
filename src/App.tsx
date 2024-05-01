import Layout from '@/components/Layout/Layout';
import Analytics from '@/pages/Analytics/Analytics';
import Applications from '@/pages/Applications/Applications';
import Dashaboard from '@/pages/Dashboard/Dashaboard';
import Jobs from '@/pages/Jobs/Jobs';
import Users from '@/pages/Users/Users';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashaboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Layout>
  );
};

export default App;
