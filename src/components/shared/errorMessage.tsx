import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faSync, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface ErrorBannerProps {
  title?: string;
  message?: string;
  description?: string;
  onRetry?: () => void;
  onBack?: () => void;
  retryLabel?: string;
  backLabel?: string;
  className?: string;
}

export function ErrorMessage({
  title = 'Error',
  message,
  description,
  onRetry,
  onBack,
  retryLabel = 'Retry',
  backLabel = 'Back to Home',
  className = '',
}: ErrorBannerProps) {
  return (
    <div
      className={`flex justify-center items-center min-h-[60vh] bg-background py-10 ${className}`}
    >
      <Card className='w-full max-w-md bg-transparent border-none flex flex-col items-center py-12 px-6'>
        <FontAwesomeIcon icon={faExclamationTriangle} className='text-red-500 text-6xl mb-4' />
        <div className='text-2xl font-bold mb-2 text-center'>{title}</div>
        {message && <div className='text-muted-foreground text-center mb-2'>{message}</div>}
        {description && <div className='text-muted-foreground text-center mb-4'>{description}</div>}
        <div className='flex flex-row gap-2'>
          {onBack && (
            <Button variant='outline' onClick={onBack} className='flex items-center gap-2 mt-2'>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ width: '0.8rem', height: '0.8rem' }}
                className='shrink-0'
              />
              {backLabel}
            </Button>
          )}
          {onRetry && (
            <Button variant='secondary' onClick={onRetry} className='flex items-center gap-2 mt-2'>
              <FontAwesomeIcon
                icon={faSync}
                style={{ width: '0.8rem', height: '0.8rem' }}
                className='shrink-0'
              />
              {retryLabel}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
