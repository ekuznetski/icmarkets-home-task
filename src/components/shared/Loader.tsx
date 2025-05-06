import React from 'react';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

interface LoaderBannerProps {
  title?: string;
  message?: string;
  description?: string;
  className?: string;
}

export function Loader({
  title = 'Loading',
  message,
  description,
  className = '',
}: LoaderBannerProps) {
  return (
    <div
      className={`flex justify-center items-center min-h-[60vh] bg-background py-10 ${className}`}
    >
      <Card className='w-full max-w-md bg-transparent border-none flex flex-col items-center py-12 px-6'>
        <FontAwesomeIcon
          icon={faSync}
          className='text-blue-500 mb-4 animate-spin'
          style={{ width: '40px', height: '40px' }}
        />
        <div className='text-2xl font-bold mb-2 text-center'>{title}</div>
        {message && <div className='text-muted-foreground text-center mb-2'>{message}</div>}
        {description && <div className='text-muted-foreground text-center mb-4'>{description}</div>}
      </Card>
    </div>
  );
}
