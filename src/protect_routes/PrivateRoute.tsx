import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes: React.FC = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
