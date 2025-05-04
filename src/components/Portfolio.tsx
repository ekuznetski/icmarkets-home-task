'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useAllSymbols } from '@/hooks/useAllSymbols';
import { useCallback, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import type { CryptoSymbol } from '@/domain/types/CryptoSymbol';
import { compactNumber } from '@/utils/compactNumber';
import { removeCoin } from '@/store/portfolioSlice';

export function Portfolio() {
  const coins = useAppSelector((state) => state.portfolio.coins);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useAllSymbols();

  const portfolioSymbols: CryptoSymbol[] = useMemo(() => {
    if (!data) return [];
    return data.filter((symbol) => coins.some((c) => c.id === symbol.id));
  }, [data, coins]);

  const handleRemove = useCallback(
    (id: string) => {
      dispatch(removeCoin(id));
    },
    [dispatch],
  );

  const columns = useMemo<ColumnDef<CryptoSymbol>[]>(
    () => [
      {
        header: '#',
        cell: (info) => info.row.index + 1,
        enableSorting: false,
      },
      {
        header: 'Coin',
        accessorKey: 'name',
        cell: (info) => (
          <span className='flex items-center gap-2'>
            <Image
              src={info.row.original.image}
              alt={info.row.original.name}
              className='w-5 h-5'
              width={20}
              height={20}
            />
            {info.row.original.name}
          </span>
        ),
      },
      {
        header: 'Symbol',
        accessorKey: 'symbol',
        cell: (info) => info.getValue<string>().toUpperCase(),
      },
      {
        header: 'Price',
        accessorKey: 'current_price',
        cell: (info) => {
          const price = info.getValue<number>();
          const change = info.row.original.price_change_percentage_24h;
          const color = change >= 0 ? 'text-green-400' : 'text-red-400';
          return <span className={color}>${price.toLocaleString()}</span>;
        },
      },
      {
        header: 'Market Cap',
        accessorKey: 'market_cap',
        cell: (info) => compactNumber(info.row.original.market_cap),
      },
      {
        header: '24h %',
        accessorKey: 'price_change_percentage_24h',
        cell: (info) => {
          const value = info.getValue<number>();
          return (
            <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
              {value?.toFixed(2)}%
            </span>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => (
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600'
            onClick={() => handleRemove(info.row.original.id)}
          >
            Remove
          </button>
        ),
      },
    ],
    [handleRemove],
  );

  const table = useReactTable({
    data: portfolioSymbols,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <div className='p-4 bg-white text-black dark:bg-zinc-900 dark:text-white'>Loading...</div>
    );
  if (isError)
    return (
      <div className='p-4 text-red-500 bg-white dark:bg-zinc-900 dark:text-red-400'>
        Failed to load data
      </div>
    );
  if (portfolioSymbols.length === 0) {
    return <div className='my-4'>Portfolio is empty</div>;
  }

  return (
    <div className='p-4 overflow-x-auto bg-white text-black dark:bg-zinc-900 dark:text-white'>
      <h2 className='text-xl font-bold mb-2'>Portfolio</h2>
      <table className='min-w-full table-auto border-collapse bg-white text-black dark:bg-zinc-900 dark:text-white'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='text-left border-b border-gray-300 dark:border-gray-700'
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='px-4 py-2'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors'
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='px-4 py-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
