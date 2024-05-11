import { Chip } from '@material-tailwind/react';

type Colors = 'green' | 'amber' | 'blue';

const ChipComponent = ({ status }: { status: string }) => {
  let bgColor: Colors = 'green';
  switch (status) {
    case 'super-admin':
      bgColor = 'green';
      break;
    case 'employer':
      bgColor = 'amber';
      break;
    case 'job seeker':
      bgColor = 'blue';
      break;

    default:
      break;
  }
  return (
    <div className="w-max">
      <Chip variant="ghost" size="sm" value={status} color={bgColor} />
    </div>
  );
};

export default ChipComponent;
