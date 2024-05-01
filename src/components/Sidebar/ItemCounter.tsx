import { GoChevronRight } from 'react-icons/go';

const ItemCounter = ({ number }: { number: number }) => {
  return (
    <div className="flex items-center gap-1 text-default-400">
      <span className="text-small">{number}</span>
      <GoChevronRight className="text-lg" />
    </div>
  );
};

export default ItemCounter;
