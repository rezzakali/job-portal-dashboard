import { Typography } from '@material-tailwind/react';

const ShowInputErrorTypography = ({ message }: { message: string }) => {
  return <Typography className="text-red-300">{message}</Typography>;
};

export default ShowInputErrorTypography;
