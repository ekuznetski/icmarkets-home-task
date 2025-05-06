'use client';

import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('@/components/shared/loader').then((m) => m.Loader));

const SymbolsTableInner = dynamic(
  () => import('@/components/core/symbolsTable/symbolsTableInner').then((m) => m.SymbolsTableInner),
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
import { useAllSymbols } from '@/hooks/useAllSymbols';

export function SymbolsTable() {
  const { isError, isLoading, data } = useAllSymbols();

  if (isLoading) return <Loader />;
  if (isError || !data)
    return (
      <ErrorMessage
        title='Failed to load data'
        description='Please check your connection or try again later.'
        onRetry={window.location.reload}
      />
    );
  return <SymbolsTableInner />;
}
