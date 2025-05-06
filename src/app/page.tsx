import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSymbolsRequest } from '@/utils/request';
import { QUERY_KEYS } from '@/lib/queryKeys';
import { getQueryClient } from '@/lib/queryClient';
import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('@/components/shared/loader').then((m) => m.Loader));

const SymbolsTable = dynamic(
  () => import('@/components/core/symbolsTable/symbolsTable').then((m) => m.SymbolsTable),
  {
    loading: () => <Loader />,
  },
);

export default async function Page() {
  const queryClient = getQueryClient();

  const symbols = await getSymbolsRequest();
  queryClient.setQueryData(QUERY_KEYS.allSymbols, symbols);

  const dehydratedState = dehydrate(queryClient);
  // TODO make sense to move hydration to HOC to follow DRY principle and reuse it in other components
  return (
    <HydrationBoundary state={dehydratedState}>
      <SymbolsTable />
    </HydrationBoundary>
  );
}

export const generateMetadata = () => ({
  title: 'Crypto Portfolio — Home',
  description: 'Up-to-date cryptocurrency symbols and portfolio.',
});
