import { RootState } from '@/app/store';
import { setSearchValue, setValue } from '@/features/users/usersSlice';
import useDebounce from '@/hooks/useDebounce';
import { Input } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const SearchUserInput: React.FC = () => {
  const { value } = useSelector((state: RootState) => state.user);

  // const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  // debounce handler
  const debouncedSearch = useDebounce(value, 500);

  const handleClearInputField = () => {
    dispatch(setValue(''));
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
      placeholder="Search user by email or phone..."
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
      onChange={(e) => dispatch(setValue(e.target.value))}
    />
  );
};

export default SearchUserInput;
