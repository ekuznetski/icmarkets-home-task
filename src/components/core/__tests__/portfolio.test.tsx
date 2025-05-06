import { render, screen } from '@testing-library/react';
import { Portfolio } from '@/components/core/portfolio';

const useAppSelectorMock = jest.fn(() => ({ btc: { id: 'btc' } }));
jest.mock('@/store/hooks', () => ({
  useAppSelector: (...args: unknown[]) => useAppSelectorMock.apply(null, args),
  useAppDispatch: () => jest.fn(),
}));

const useAllSymbolsMock = jest.fn(() => ({
  isLoading: false,
  isError: false,
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
      total_volume: 1000000,
      high_24h: 51000,
      low_24h: 49000,
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
}));
jest.mock('@/hooks/useAllSymbols', () => ({
  useAllSymbols: (...args: unknown[]) => useAllSymbolsMock.apply(null, args),
}));

jest.mock('next/image', () => {
  const MockImage = (props: Record<string, unknown>) => <img {...props} />;
  MockImage.displayName = 'NextImage';
  return MockImage;
});
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@/utils/compactNumber', () => ({ compactNumber: (n: number) => n.toString() }));
jest.mock('@/hooks/usePortfolioActions', () => ({
  usePortfolioActions: () => ({ remove: jest.fn() }),
}));
jest.mock('@/components/ui/button', () => ({ Button: (props: any) => <button {...props} /> }));
jest.mock('@/components/shared/errorMessage', () => ({
  ErrorMessage: (props: any) => <div data-testid='error-message'>{props.title}</div>,
}));
jest.mock('@/components/shared/loader', () => ({ Loader: () => <div data-testid='loader' /> }));

describe('Portfolio', () => {
  beforeEach(() => {
    useAppSelectorMock.mockReset();
    useAppSelectorMock.mockReturnValue({ btc: { id: 'btc' } });
    useAllSymbolsMock.mockReset();
    useAllSymbolsMock.mockReturnValue({
      isLoading: false,
      isError: false,
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
          total_volume: 1000000,
          high_24h: 51000,
          low_24h: 49000,
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
    });
  });

  it('renders portfolio with a coin', () => {
    render(<Portfolio />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(
      screen.getByText((content, node) => {
        const hasText = (node: Element) => node.textContent === '(BTC)';
        const nodeHasText = hasText(node as Element);
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child as Element),
        );
        return nodeHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('$50000')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('renders empty portfolio message', () => {
    useAppSelectorMock.mockReturnValueOnce({} as any);
    render(<Portfolio />);
    expect(screen.getByText('Your portfolio is empty')).toBeInTheDocument();
    expect(screen.getByText('Add Coin')).toBeInTheDocument();
  });

  it('renders loader when loading', () => {
    useAllSymbolsMock.mockReturnValueOnce({
      isLoading: true,
      isError: false,
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
          total_volume: 1000000,
          high_24h: 51000,
          low_24h: 49000,
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
    });
    render(<Portfolio />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message on error', () => {
    useAllSymbolsMock.mockReturnValueOnce({
      isLoading: false,
      isError: true,
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
          total_volume: 1000000,
          high_24h: 51000,
          low_24h: 49000,
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
    });
    render(<Portfolio />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
