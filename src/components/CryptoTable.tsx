'use client'

import { useSymbols } from '@/hooks/useSymbols'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { SearchBar } from './SearchBar'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import type { CryptoSymbol } from '@/domain/types/CryptoSymbol'
import { compactNumber } from '@/utils/compactNumber'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setCryptoTableSorting } from '@/store/uiSlice'

export function CryptoTable() {
  const { data, isLoading, isError } = useSymbols()
  const [search, setSearch] = useState('')
  const sorting = useAppSelector((state) => state.ui.cryptoTableSorting)
  const dispatch = useAppDispatch()

  const filteredData = useMemo(
    () =>
      data?.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      ) ?? [],
    [data, search]
  )

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
          <span className="flex items-center gap-2">
            <Image
              src={info.row.original.image}
              alt={info.row.original.name}
              className="w-5 h-5"
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
          const price = info.getValue<number>()
          const change = info.row.original.price_change_percentage_24h
          const color = change >= 0 ? 'text-green-400' : 'text-red-400'
          return <span className={color}>${price.toLocaleString()}</span>
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
          const value = info.getValue<number>()
          return (
            <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
              {value.toFixed(2)}%
            </span>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const nextSorting = typeof updater === 'function' ? updater(sorting) : updater
      dispatch(setCryptoTableSorting(nextSorting))
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
  })

  if (isLoading)
    return (
      <div className="p-4 bg-white text-black dark:bg-zinc-900 dark:text-white">Loading...</div>
    )
  if (isError)
    return (
      <div className="p-4 text-red-500 bg-white dark:bg-zinc-900 dark:text-red-400">
        Failed to load data
      </div>
    )

  return (
    <div className="p-4 overflow-x-auto bg-white text-black dark:bg-zinc-900 dark:text-white">
      <SearchBar value={search} onChange={setSearch} />
      <table className="min-w-full table-auto border-collapse bg-white text-black dark:bg-zinc-900 dark:text-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="text-left border-b border-gray-300 dark:border-gray-700"
            >
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                return (
                  <th
                    key={header.id}
                    className={
                      'px-4 py-2 cursor-pointer select-none transition-colors duration-200' +
                      (canSort
                        ? ' hover:underline hover:text-blue-600 dark:hover:text-blue-400'
                        : '')
                    }
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort &&
                        (sorted === false ? (
                          <FaSort className="text-xs" />
                        ) : sorted === 'asc' ? (
                          <FaSortUp className="text-xs" />
                        ) : sorted === 'desc' ? (
                          <FaSortDown className="text-xs" />
                        ) : null)}
                    </span>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
