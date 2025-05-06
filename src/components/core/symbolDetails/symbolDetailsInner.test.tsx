import { render, screen } from '@testing-library/react';
import { SymbolDetailsInner } from './symbolDetailsInner';

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'btc' }),
  useRouter: () => ({ push: jest.fn() }),
}));

const mockData = {
  id: 'btc',
  name: 'Bitcoin',
  symbol: 'btc',
  image: { large: '/btc.png' },
  description: { en: 'Bitcoin is a cryptocurrency. More text.' },
  categories: ['Currency', 'Store of Value'],
  market_cap_rank: 1,
  sentiment_votes_up_percentage: 80,
  sentiment_votes_down_percentage: 20,
  hashing_algorithm: 'SHA-256',
  genesis_date: '2009-01-03',
  country_origin: 'N/A',
  block_time_in_minutes: 10,
  watchlist_portfolio_users: 100000,
  links: {
    homepage: ['https://bitcoin.org'],
    subreddit_url: 'https://reddit.com/r/bitcoin',
    twitter_screen_name: 'bitcoin',
  },
};

jest.mock('@/hooks/useSymbolDetails', () => ({
  useSymbolDetails: () => ({ data: mockData }),
}));

jest.mock('next/image', () => {
  const MockImage = (props: Record<string, unknown>) => <img {...props} />;
  MockImage.displayName = 'NextImage';
  return MockImage;
});
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid='icon' />,
}));
jest.mock('@/components/ui/badge', () => ({
  Badge: (props: any) => <span>{props.children}</span>,
}));
jest.mock('@/components/shared/addToPortfolio', () => ({
  AddToPortfolio: () => <div data-testid='add-to-portfolio' />,
}));
jest.mock('@/components/ui/button', () => ({ Button: (props: any) => <button {...props} /> }));

describe('SymbolDetailsInner', () => {
  it('renders symbol details with all info', () => {
    render(<SymbolDetailsInner />);
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText((content, node) => node?.textContent === '(BTC)')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin is a cryptocurrency.')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
    expect(screen.getByText('Store of Value')).toBeInTheDocument();
    expect(screen.getByText('Market Cap Rank:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Sentiment Up:')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('Sentiment Down:')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('Hashing Algorithm:')).toBeInTheDocument();
    expect(screen.getByText('SHA-256')).toBeInTheDocument();
    expect(screen.getByText('Genesis Date:')).toBeInTheDocument();
    expect(screen.getByText('2009-01-03')).toBeInTheDocument();
    expect(screen.getByText('Country Origin:')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText('Block Time (min):')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Watchlist Users:')).toBeInTheDocument();
    expect(screen.getByText('100000')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('Subreddit')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByTestId('add-to-portfolio')).toBeInTheDocument();
  });

  it('renders fallback if no data', () => {
    jest.resetModules();
    jest.doMock('@/hooks/useSymbolDetails', () => ({ useSymbolDetails: () => ({ data: null }) }));
    const { SymbolDetailsInner: SymbolDetailsInnerNoData } = require('./symbolDetailsInner');
    const { container } = render(<SymbolDetailsInnerNoData />);
    expect(container.firstChild).toBeNull();
  });
});
