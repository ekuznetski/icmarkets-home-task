'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSymbolDetails } from '@/hooks/useSymbolDetails';
import { useAppDispatch } from '@/store/hooks';
import { addCoin } from '@/store/portfolioSlice';

export default function SymbolDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSymbolDetails(id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddCoin = () => {
    if (!data) return;
    dispatch(
      addCoin({
        id: data.id,
        name: data.name,
        symbol: data.symbol,
      }),
    );
  };

  const goBack = () => {
    router.push('/');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Loading error</div>;

  return (
    <div>
      <button
        className='mb-4 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md'
        onClick={goBack}
      >
        Back to main
      </button>
      <h1>{data.name}</h1>
      <p>{data.description.en}</p>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
        onClick={handleAddCoin}
      >
        Add to portfolio
      </button>
    </div>
  );
}
