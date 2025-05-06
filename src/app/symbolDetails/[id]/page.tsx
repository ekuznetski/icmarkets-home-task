import { SymbolDetails } from '@/components/core/symbolDetails/symbolDetails';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export default function SymbolDetailsPage() {
  return <SymbolDetails />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Crypto Portfolio — ${id.toUpperCase()}`,
    description: `Up-to-date cryptocurrency symbols and portfolio.`,
  };
}
