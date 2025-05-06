'use client';

import { SymbolsTableInner } from '@/components/core/symbolsTable/symbolsTableInner';
import { ErrorMessage } from '@/components/shared/errorMessage';
import { Loader } from '@/components/shared/loader';
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
