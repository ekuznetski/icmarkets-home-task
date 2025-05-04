import { useQuery } from '@tanstack/react-query';
import { getSymbolDetailsRequest } from '@/utils/request';
import { QUERY_KEYS } from '@/lib/queryKeys';
import { CryptoSymbolDetails } from '@/domain/types/CryptoSymbol';

export const useSymbolDetails = (id: string) => {
  return useQuery<CryptoSymbolDetails>({
    queryKey: QUERY_KEYS.symbolDetails(id),
    queryFn: () => getSymbolDetailsRequest(id),
    enabled: !!id,
  });
};
