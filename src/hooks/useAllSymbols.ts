import { getSymbolsRequest } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { CryptoSymbol } from '@/domain/types/CryptoSymbol';
import { QUERY_KEYS } from '@/lib/queryKeys';

export const useAllSymbols = () => {
  return useQuery<Record<string, CryptoSymbol>>({
    queryKey: QUERY_KEYS.allSymbols,
    queryFn: getSymbolsRequest,
  });
};
