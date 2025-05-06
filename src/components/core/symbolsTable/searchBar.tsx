import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
    onChange('');
  };
  return (
    <div className='relative w-full max-w-xs mb-4'>
      <label htmlFor='search-input' className='sr-only'>
        Search by name or symbol
      </label>
      <Input
        id='search-input'
        type='text'
        placeholder='Search by name or symbol...'
        value={internalValue}
        onChange={internalOnChange}
      />
      {internalValue && (
        <Button
          variant='ghost'
          size='icon'
          onClick={clearSearch}
          className='absolute !bg-transparent right-2 top-1/2 -translate-y-1/2 cursor-pointer'
          aria-label='Clear search'
        >
          <FontAwesomeIcon icon={faXmark} className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
}
