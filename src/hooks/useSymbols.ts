import { getSymbolsRequest } from '@/utils/request'
import { useQuery } from '@tanstack/react-query'
import { CryptoSymbol } from '@/domain/types/CryptoSymbol'
import { QUERY_KEYS } from '@/lib/queryKeys'

export const useSymbols = () => {
  return useQuery<CryptoSymbol[]>({
    queryKey: QUERY_KEYS.symbols,
    queryFn: getSymbolsRequest,
    staleTime: 60_000,
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
