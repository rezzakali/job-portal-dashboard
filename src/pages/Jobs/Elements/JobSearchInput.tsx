import { setSearchValue } from '@/features/jobs/jobsSlice';
import useDebounce from '@/hooks/useDebounce';
import { Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

const JobSearchInput: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const dispatch = useDispatch();

  // debounce handler
  const debouncedSearch = useDebounce(value, 500);

  const handleClearInputField = () => {
    setValue('');
    dispatch(setSearchValue(''));
  };

  // call API Request here
  useEffect(() => {
    dispatch(setSearchValue(debouncedSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Input
      type="text"
      size="md"
      crossOrigin={undefined}
      placeholder="Search job by title, company or location..."
      className="!border !border-gray-300  text-gray-900 ring-1 ring-transparent placeholder:opacity-75 focus:!border shadow-none !py-2 rounded !bg-primaryColor"
      labelProps={{
        className: 'hidden',
      }}
      containerProps={{ className: 'min-w-[100px]' }}
      icon={
        !value ? (
          <IoIosSearch className="text-black" />
        ) : (
          <IoClose className="cursor-pointer" onClick={handleClearInputField} />
        )
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default JobSearchInput;
