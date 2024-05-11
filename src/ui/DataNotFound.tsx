import { Typography } from '@material-tailwind/react';

const DataNotFound = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] m-auto">
      <Typography
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Data not found!
      </Typography>
    </div>
  );
};

export default DataNotFound;
