'use client'

import { useSymbols } from '@/hooks/useSymbols'
import Image from 'next/image'
export function CryptoTable() {
  const { data, isLoading, isError } = useSymbols()

  if (isLoading)
    return (
      <div className="p-4 bg-white text-black dark:bg-zinc-900 dark:text-white">Загрузка...</div>
    )
  if (isError)
    return (
      <div className="p-4 text-red-500 bg-white dark:bg-zinc-900 dark:text-red-400">
        Ошибка загрузки данных
      </div>
    )

  return (
    <div className="p-4 overflow-x-auto bg-white text-black dark:bg-zinc-900 dark:text-white">
      <table className="min-w-full table-auto border-collapse bg-white text-black dark:bg-zinc-900 dark:text-white">
        <thead>
          <tr className="text-left border-b border-gray-300 dark:border-gray-700">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Coin</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Market Cap</th>
            <th className="px-4 py-2">24h %</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((coin, index) => (
            <tr
              key={coin.id}
              className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 flex items-center gap-2">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
                {coin.name}
              </td>
              <td className="px-4 py-2 uppercase">{coin.symbol}</td>
              <td className="px-4 py-2">${coin.current_price.toLocaleString()}</td>
              <td className="px-4 py-2">${coin.market_cap.toLocaleString()}</td>
              <td
                className={`px-4 py-2 ${coin.price_change_percentage_24h >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
