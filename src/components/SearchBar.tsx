import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDebounce } from '@/hooks/useDebounce';
type SearchBarProps = {
  onChange: (value: string) => void;
};

export function SearchBar({ onChange }: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const debouncedOnChange = useDebounce(onChange, 100);
  const internalOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    debouncedOnChange(e.target.value);
  };
  const clearSearch = () => {
    setInternalValue('');
  };
  return (
    <div className='relative w-full max-w-xs mb-4'>
      <input
        type='text'
        placeholder='Search by name or symbol...'
        value={internalValue}
        onChange={internalOnChange}
        className='px-3 py-2 border border-gray-300 rounded w-full bg-white text-black dark:bg-zinc-800 dark:text-white pr-10'
      />
      {internalValue && (
        <button
          type='button'
          onClick={clearSearch}
          className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none transition-colors duration-200'
          aria-label='Clear search'
        >
          <AiOutlineClose size={18} />
        </button>
      )}
    </div>
  );
}
