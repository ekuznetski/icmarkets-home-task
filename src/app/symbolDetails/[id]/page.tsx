import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('@/components/shared/loader').then((m) => m.Loader));
import type { Metadata } from 'next';

const SymbolDetails = dynamic(
  () => import('@/components/core/symbolDetails/symbolDetails').then((m) => m.SymbolDetails),
  {
    loading: () => <Loader />,
  },
);

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
