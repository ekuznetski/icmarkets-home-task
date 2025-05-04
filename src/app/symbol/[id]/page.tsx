'use client';

import { useParams } from 'next/navigation';
import { useSymbolDetails } from '@/hooks/useSymbolDetails';

export default function SymbolDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSymbolDetails(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Loading error</div>;

  return (
    <ul>
      {Object.entries(data as unknown as Record<string, unknown>).map(([key, value]) => (
        <li key={key}>
          <b>{key}:</b> {typeof value === 'object' ? JSON.stringify(value) : String(value)}
        </li>
      ))}
    </ul>
  );
}
