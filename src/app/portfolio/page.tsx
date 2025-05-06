import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSymbolsRequest } from '@/utils/request';
import { QUERY_KEYS } from '@/lib/queryKeys';
import { getQueryClient } from '@/lib/queryClient';
import { Portfolio } from '@/components/core/portfolio';

export default async function Page() {
  const queryClient = getQueryClient();

  const symbols = await getSymbolsRequest();
  queryClient.setQueryData(QUERY_KEYS.allSymbols, symbols);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Portfolio />
    </HydrationBoundary>
  );
}

export const generateMetadata = () => ({
  title: 'Crypto Portfolio — Portfolio',
  description: 'Up-to-date cryptocurrency symbols and portfolio.',
});
