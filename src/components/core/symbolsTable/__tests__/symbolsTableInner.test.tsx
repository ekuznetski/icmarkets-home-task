import { render, screen } from '@testing-library/react';
import { SymbolsTableInner } from '@/components/core/symbolsTable/symbolsTableInner';

jest.mock('@/hooks/useAllSymbols', () => ({
  useAllSymbols: () => ({
    data: {
      btc: {
        id: 'btc',
        symbol: 'btc',
        name: 'Bitcoin',
        image: '/btc.png',
        current_price: 50000,
        market_cap: 1000000000,
        market_cap_rank: 1,
        fully_diluted_valuation: 0,
        total_volume: 0,
        high_24h: 0,
        low_24h: 0,
        price_change_24h: 0,
        price_change_percentage_24h: 2.5,
        market_cap_change_24h: 0,
        market_cap_change_percentage_24h: 0,
        circulating_supply: 0,
        total_supply: 0,
        max_supply: 0,
        ath: 0,
        ath_change_percentage: 0,
        ath_date: '',
        atl: 0,
        atl_change_percentage: 0,
        atl_date: '',
        roi: null,
        last_updated: '',
      },
    },
  }),
}));

jest.mock('next/image', () => {
  const MockImage = (props: Record<string, unknown>) => <img {...props} />;
  MockImage.displayName = 'NextImage';
  return MockImage;
});
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@/components/shared/addToPortfolio', () => ({
  AddToPortfolio: () => <div data-testid='add-to-portfolio' />,
}));
jest.mock('@/store/hooks', () => ({
  useAppSelector: () => [],
  useAppDispatch: () => jest.fn(),
}));

// Мокаем Table и подкомпоненты, если они не простые
import type { PropsWithChildren, HTMLAttributes } from 'react';
jest.mock('@/components/ui/table', () => {
  const Table = (props: PropsWithChildren<object>) => <table>{props.children}</table>;
  Table.displayName = 'Table';
  const TableHeader = (props: PropsWithChildren<object>) => <thead>{props.children}</thead>;
  TableHeader.displayName = 'TableHeader';
  const TableBody = (props: PropsWithChildren<object>) => <tbody>{props.children}</tbody>;
  TableBody.displayName = 'TableBody';
  const TableRow = (props: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) => (
    <tr {...props}>{props.children}</tr>
  );
  TableRow.displayName = 'TableRow';
  const TableHead = (props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) => (
    <th {...props}>{props.children}</th>
  );
  TableHead.displayName = 'TableHead';
  const TableCell = (props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) => (
    <td {...props}>{props.children}</td>
  );
  TableCell.displayName = 'TableCell';
  return {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  };
});

// Мокаем SearchBar
jest.mock('../searchBar', () => ({ SearchBar: () => <input data-testid='search-bar' /> }));

// Мокаем compactNumber
jest.mock('@/utils/compactNumber', () => ({ compactNumber: (n: number) => n.toString() }));

describe('SymbolsTableInner', () => {
  it('renders table with symbol', () => {
    render(<SymbolsTableInner />);
    expect(screen.getByText('All Symbols')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByTestId('add-to-portfolio')).toBeInTheDocument();
  });
});
