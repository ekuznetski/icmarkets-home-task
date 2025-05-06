'use client';

import { useAppSelector } from '@/store/hooks';
import { useAllSymbols } from '@/hooks/useAllSymbols';
import { useMemo } from 'react';
import Image from 'next/image';
import type { CryptoSymbol } from '@/domain/types/CryptoSymbol';
import { compactNumber } from '@/utils/compactNumber';
import { usePortfolioActions } from '@/hooks/usePortfolioActions';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBoxOpen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '@/components/shared/errorMessage';
import { Loader } from '../shared/loader';

export function Portfolio() {
  const coins = useAppSelector((state) => state.portfolio.coins);
  const { remove } = usePortfolioActions();
  const { isError, isLoading, data } = useAllSymbols();

  const router = useRouter();

  const portfolioSymbolsArray: CryptoSymbol[] = useMemo(() => {
    if (!data) return [];
    return Object.values(coins).map((coin) => data[coin.id]);
  }, [data, coins]);

  const navigateToSymbolDetails = (symbol: CryptoSymbol) => {
    router.push(`/symbolDetails/${symbol.id}`);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage
        title='Failed to load data'
        description='Please check your connection or try again later.'
        onRetry={window.location.reload}
      />
    );

  return (
    <div className='w-full mx-auto my-4 px-0 sm:px-2 bg-background flex flex-col'>
      <h2 className='text-2xl font-bold mt-4 mb-2'>Portfolio</h2>

      {!portfolioSymbolsArray.length && (
        <div className='flex flex-col items-center justify-center py-16'>
          <span className='mb-4'>
            <FontAwesomeIcon icon={faBoxOpen} className='text-6xl text-muted-foreground/40' />
          </span>
          <div className='text-2xl font-semibold mb-2'>Your portfolio is empty</div>
          <div className='text-base text-muted-foreground mb-6'>
            Start adding coins to track your crypto portfolio here.
          </div>
          <Button
            className='mt-2 w-full max-w-xs text-lg font-semibold py-3 px-8 rounded shadow-lg'
            variant='default'
            onClick={() => router.push('/')}
          >
            <FontAwesomeIcon icon={faPlusCircle} className='w-4 h-4 mr-2' />
            Add Coin
          </Button>
        </div>
      )}

      <div className='flex flex-col gap-4 w-full'>
        {portfolioSymbolsArray.map((symbol) => (
          <div
            key={symbol.id}
            className='flex flex-col sm:flex-row items-center gap-2 sm:gap-6 p-3 sm:p-6 shadow-lg border border-zinc-800/60 rounded-2xl bg-zinc-900/90 dark:bg-zinc-900 cursor-pointer transition hover:shadow-2xl hover:bg-zinc-800/80 dark:hover:bg-zinc-800/80 group relative overflow-hidden'
            onClick={() => navigateToSymbolDetails(symbol)}
            role='button'
            tabIndex={0}
            aria-label={`View details for ${symbol.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToSymbolDetails(symbol);
              }
            }}
          >
            <div className='grid sm:grid-cols-7 sm:grid-rows-1 gap-2 w-full'>
              <div className='flex flex-row items-center gap-2 sm:gap-6 col-span-4 sm:col-span-1'>
                <Image
                  src={symbol.image}
                  alt={symbol.name}
                  width={48}
                  height={48}
                  className='rounded-full border-2 border-zinc-700 bg-white dark:bg-zinc-800 mb-2 sm:mb-0 shadow-sm transition-transform duration-200'
                />
                <div className='flex flex-col'>
                  <span className='text-base sm:text-xl font-semibold truncate'>
                    {symbol.name}{' '}
                    <span className='text-muted-foreground font-normal'>
                      ({symbol.symbol.toUpperCase()})
                    </span>
                  </span>
                  <span className='text-xs sm:text-sm text-muted-foreground truncate'>
                    Market Cap: {compactNumber(symbol.market_cap)}
                  </span>
                </div>
              </div>

              <div className='flex flex-col sm:col-start-3 row-start-2 sm:row-start-1'>
                <span className='font-semibold'>${symbol.current_price}</span>
                <span className='text-muted-foreground text-xs'>Price</span>
              </div>
              <div className='flex flex-col sm:col-start-4 row-start-2 sm:row-start-1'>
                <span className='font-semibold'>{compactNumber(symbol.total_volume)}</span>
                <span className='text-muted-foreground text-xs'>Volume</span>
              </div>
              <div className='flex flex-col sm:col-start-5 row-start-2 sm:row-start-1'>
                <span className='font-semibold'>${symbol.low_24h}</span>
                <span className='text-muted-foreground text-xs'>24h Low</span>
              </div>
              <div className='flex flex-col sm:col-start-6 row-start-2 sm:row-start-1'>
                <span className='font-semibold'>${symbol.high_24h}</span>
                <span className='text-muted-foreground text-xs'>24h High</span>
              </div>

              <Button
                variant='destructive'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  remove(symbol.id);
                }}
                className='sm:col-start-7 sm:row-start-1 sm:col-span-1 col-span-4 row-start-3 mt-2 sm:mt-0 w-full sm:w-auto ml-0 sm:ml-6 shrink-0 flex items-center gap-1 sm:self-center sm:h-10 sm:px-6 text-base sm:text-base shadow-md transition-transform duration-200'
              >
                <FontAwesomeIcon icon={faTrash} className='w-4 h-4' /> Remove
              </Button>
            </div>

            <div className='hidden sm:block absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-green-400/10 via-transparent to-blue-400/10 group-hover:from-green-400/30 group-hover:to-blue-400/30 transition-all duration-200' />
          </div>
        ))}
      </div>
    </div>
  );
}
