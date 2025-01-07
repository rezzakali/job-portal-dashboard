import { RootState } from '@/app/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate(-1);
      return;
    }
  }, [isLogin, navigate]);
  return children;
};

export default PublicRoute;
