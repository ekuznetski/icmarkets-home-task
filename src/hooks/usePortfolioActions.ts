import { useAppDispatch } from '@/store/hooks';
import { addCoin, removeCoin } from '@/store/portfolioSlice';
import { toast } from 'sonner';
import { useAllSymbols } from './useAllSymbols';
import { useCallback } from 'react';

export function usePortfolioActions() {
  const dispatch = useAppDispatch();
  const { data: coins } = useAllSymbols();

  const add = useCallback(
    (coinId: string) => {
      if (!coins) return;
      const coin = coins[coinId];
      dispatch(
        addCoin({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
        }),
      );
      toast.success(`${coin.name} added to portfolio!`);
    },
    [coins, dispatch],
  );

  const remove = useCallback(
    (coinId: string) => {
      dispatch(removeCoin(coinId));
      if (!coins) return;
      const coin = coins[coinId];
      toast.warning(`${coin.name} removed from portfolio!`);
    },
    [coins, dispatch],
  );

  return { add, remove };
}
