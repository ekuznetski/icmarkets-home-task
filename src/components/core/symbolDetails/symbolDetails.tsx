'use client';

import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('@/components/shared/loader').then((m) => m.Loader));
import { useSymbolDetails } from '@/hooks/useSymbolDetails';
import { useParams, useRouter } from 'next/navigation';

const SymbolDetailsInner = dynamic(
  () => import('./symbolDetailsInner').then((m) => m.SymbolDetailsInner),
  {
    loading: () => <Loader />,
  },
);
const ErrorMessage = dynamic(
  () => import('@/components/shared/errorMessage').then((m) => m.ErrorMessage),
  {
    loading: () => <Loader />,
  },
);
const Skeleton = dynamic(() => import('@/components/ui/skeleton').then((m) => m.Skeleton), {
  loading: () => <Loader />,
});

export function SymbolDetails() {
  const { id } = useParams<{ id: string }>();
  const { isError, isLoading, data } = useSymbolDetails(id);
  const router = useRouter();

  const goBack = () => {
    router.push('/');
  };

  if (isLoading)
    return (
      <div className='flex flex-col items-center w-full bg-background min-h-[80vh] py-10'>
        <div className='self-start ml-4 mt-4 mb-4'>
          <Skeleton className='h-10 w-32 rounded' />
        </div>
        <div className='flex flex-col items-center gap-3 w-full max-w-3xl mt-4'>
          <Skeleton className='w-24 h-24 rounded-full mb-2' />
          <Skeleton className='h-10 w-60 mb-2 rounded' />
          <Skeleton className='h-5 w-40 mb-2 rounded' />
          <Skeleton className='h-4 w-80 mb-2 rounded' />
        </div>
        <div className='flex flex-wrap gap-2 justify-center mb-2 mt-6 w-full max-w-3xl'>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className='h-6 w-20 rounded-full' />
          ))}
        </div>
        <hr className='my-2 border-muted-foreground/20 w-full max-w-3xl' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base w-full max-w-3xl'>
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className='h-5 w-40 mb-2 rounded' />
          ))}
        </div>
        <hr className='my-2 border-muted-foreground/20 w-full max-w-3xl' />
        <div className='flex flex-wrap gap-4 justify-center mt-2 w-full max-w-3xl'>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className='h-6 w-28 rounded' />
          ))}
        </div>
        <div className='flex flex-col items-center pt-4 pb-6 px-8 w-full max-w-3xl'>
          <Skeleton className='w-full max-w-xs h-12 rounded' />
        </div>
      </div>
    );

  if (isError || !data)
    return (
      <ErrorMessage
        title='Failed to load symbol details'
        message='Please check your connection or try again later.'
        onRetry={window.location.reload}
        onBack={goBack}
      />
    );

  return <SymbolDetailsInner />;
}
