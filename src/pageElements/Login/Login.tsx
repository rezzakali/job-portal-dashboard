import { useSigninMutation } from '@/features/auth/authApi';
import ShowInputErrorTypography from '@/ui/ShowInputErrorTypography';
import isApiResponseError from '@/utils/isApiResponseError';
import { Button, Input, Typography } from '@material-tailwind/react';
import { IoMdEye } from '@react-icons/all-files/io/IoMdEye';
import { IoMdEyeOff } from '@react-icons/all-files/io/IoMdEyeOff';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoginInputInterface } from './Login.interface';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const [signIn, { data: response, isLoading, isSuccess, isError, error }] =
    useSigninMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginInputInterface>();

  const onSubmit: SubmitHandler<LoginInputInterface> = (data) => {
    signIn(data);
  };

  useEffect(() => {
    if (isSuccess && response) {
      console.log('🚀 ~ useEffect ~ response:', response);
      localStorage.setItem('x-access-token', response.data);
      // window.location.replace('/');
      navigate('/', { replace: true });
      toast.success('Logged in successfully!');
      reset();
    }
    if (isError) {
      if (isApiResponseError(error)) {
        toast.error(error?.data?.message);
      }
    }
  }, [isSuccess, isError, error, reset]);

  return (
    <div className="flex flex-col items-center justify-center w-full m-auto h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 space-y-3 p-8 rounded shadow"
      >
        <Typography variant="h5" className="text-center mb-4" color="blue-gray">
          Sign In to Job Portal
        </Typography>
        <div>
          <Input
            type="email"
            label="Email"
            color="blue"
            {...register('email', { required: true })}
            error={!!errors?.email}
            spellCheck="true"
            autoComplete="true"
            autoFocus
          />
          {errors.email?.type === 'required' && (
            <ShowInputErrorTypography message={'Email is required'} />
          )}
        </div>
        <div>
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            color="blue"
            {...register('password', {
              required: true,
              minLength: 8,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+!]).{8,}$/,
            })}
            error={!!errors?.password}
            icon={
              !showPassword ? (
                <IoMdEyeOff onClick={() => setShowPassword(true)} />
              ) : (
                <IoMdEye onClick={() => setShowPassword(false)} />
              )
            }
          />
          {errors.password && errors.password.type === 'required' && (
            <ShowInputErrorTypography message={'Password is required'} />
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <ShowInputErrorTypography
              message={'Password must be at least 8 characters long'}
            />
          )}
          {errors.password && errors.password.type === 'pattern' && (
            <ShowInputErrorTypography
              message={`Password must contain at least one uppercase letter, one lowercase
              letter, and one special character`}
            />
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          id="primary-btn"
          disabled={isLoading || !isValid}
          loading={isLoading}
          className="flex items-center justify-center"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Login;
