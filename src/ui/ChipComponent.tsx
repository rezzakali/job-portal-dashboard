import { Chip } from '@material-tailwind/react';

type Colors = 'green' | 'amber' | 'blue' | 'red' | 'pink' | 'cyan';

const ChipComponent = ({ status }: { status: string }) => {
  let bgColor: Colors = 'green';
  switch (status) {
    case 'super-admin':
      bgColor = 'pink';
      break;
    case 'employer':
      bgColor = 'amber';
      break;
    case 'job seeker':
      bgColor = 'blue';
      break;
    case 'open':
      bgColor = 'green';
      break;
    case 'closed' || 'rejected':
      bgColor = 'red';
      break;
    case 'rejected':
      bgColor = 'red';
      break;
    case 'pending':
      bgColor = 'amber';
      break;
    case 'reviewed':
      bgColor = 'cyan';
      break;
    case 'accepted':
      bgColor = 'green';
      break;

    default:
      break;
  }
  return (
    <div className="w-max">
      <Chip
        variant="ghost"
        size="sm"
        value={status}
        color={bgColor}
        className="rounded-full capitalize px-3 flex items-center justify-center"
      />
    </div>
  );
};

export default ChipComponent;
