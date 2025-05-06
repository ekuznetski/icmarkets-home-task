'use client';

import { useAllSymbols } from '@/hooks/useAllSymbols';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  Row,
} from '@tanstack/react-table';
import type { CryptoSymbol } from '@/domain/types/CryptoSymbol';
import { compactNumber } from '@/utils/compactNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCryptoTableSorting } from '@/store/uiSlice';
import { useRouter } from 'next/navigation';
import { SearchBar } from './searchBar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/table';
import { AddToPortfolio } from '@/components/shared/addToPortfolio';
import { cn } from '@/lib/utils';

function globalFilterFn(row: Row<CryptoSymbol>, _columnId: string, filterValue: string) {
  // TODO: change to fuzzy filter for better UX
  if (!filterValue) return true;
  const search = filterValue.toLowerCase();
  return (
    row.original.name.toLowerCase().includes(search) ||
    row.original.symbol.toLowerCase().includes(search)
  );
}

export function SymbolsTableInner() {
  const { data } = useAllSymbols();
  const [globalFilter, setGlobalFilter] = useState('');

  const tableData = useMemo(() => Object.values(data ?? {}), [data]);

  const sorting = useAppSelector((state) => state.ui.cryptoTableSorting);
  const dispatch = useAppDispatch();
  const router = useRouter();

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
          <span className='hidden sm:flex items-center gap-2'>
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
        cell: (info) => compactNumber(info.getValue<number>()),
      },
      {
        header: '24h %',
        accessorKey: 'price_change_percentage_24h',
        cell: (info) => {
          const value = info.getValue<number>();
          return (
            <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
              {value.toFixed(2)}%
            </span>
          );
        },
      },
      {
        header: '',
        id: 'inPortfolio',
        cell: (info) => {
          return <AddToPortfolio coinId={info.row.original.id} isIcon />;
        },
        enableSorting: false,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    globalFilterFn: globalFilterFn,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: (updater) => {
      const nextSorting = typeof updater === 'function' ? updater(sorting) : updater;
      dispatch(setCryptoTableSorting(nextSorting));
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
  });

  return (
    <div className='w-full mx-auto my-4 px-0 sm:px-2 bg-background flex flex-col'>
      <h2 className='text-2xl font-bold mt-4 mb-2'>All Symbols</h2>
      <div className='mb-4'>
        <SearchBar onChange={setGlobalFilter} />
      </div>
      <div className='overflow-x-auto rounded-lg shadow'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const ariaSort =
                    sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined;
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        'p-0 sm:p-2 cursor-pointer select-none transition-colors duration-200' +
                        (canSort
                          ? ' hover:underline hover:text-blue-600 dark:hover:text-blue-400'
                          : '') +
                        (header.column.id === 'name' ? ' hidden sm:table-cell' : '')
                      }
                      {...(canSort && ariaSort ? { 'aria-sort': ariaSort } : {})}
                    >
                      {canSort ? (
                        <button
                          type='button'
                          onClick={header.column.getToggleSortingHandler()}
                          aria-label={`Sort by ${String(header.column.id)}`}
                          className='w-full h-full flex items-center gap-1 bg-transparent border-0 p-0 m-0 cursor-pointer text-inherit'
                          tabIndex={0}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === false ? (
                            <FontAwesomeIcon icon={faSort} className='w-3.5 h-3.5' />
                          ) : sorted === 'asc' ? (
                            <FontAwesomeIcon icon={faSortUp} className='w-3.5 h-3.5' />
                          ) : sorted === 'desc' ? (
                            <FontAwesomeIcon icon={faSortDown} className='w-3.5 h-3.5' />
                          ) : null}
                        </button>
                      ) : (
                        <span className='inline-flex items-center gap-1'>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const symbolId = row.original.id;
              return (
                <TableRow
                  key={row.id}
                  className='cursor-pointer'
                  onClick={() => router.push(`/symbolDetails/${symbolId}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.id === 'name' && 'hidden sm:table-cell',
                        'p-0 sm:p-2',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
