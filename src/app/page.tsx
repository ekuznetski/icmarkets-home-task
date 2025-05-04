import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSymbolsRequest } from '@/utils/request';
import { CryptoTable } from '@/components/CryptoTable';
import { QUERY_KEYS } from '@/lib/queryKeys';
import { getQueryClient } from '@/lib/queryClient';
import { Portfolio } from '@/components/Portfolio';

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.allSymbols,
    queryFn: getSymbolsRequest,
  });

  const dehydratedState = dehydrate(queryClient);
  // TODO make sense to move hydration to HOC to follow DRY principle and reuse it in other components
  return (
    <HydrationBoundary state={dehydratedState}>
      <Portfolio />
      <CryptoTable />
    </HydrationBoundary>
  );
}
