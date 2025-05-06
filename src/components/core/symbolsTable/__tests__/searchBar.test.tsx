import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/core/symbolsTable/searchBar';

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (fn: any) => fn,
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock('@/components/ui/button', () => ({
  Button: (props: any) => <button {...props} />,
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid='fa-icon' />,
}));

describe('SearchBar', () => {
  it('renders input and label', () => {
    render(<SearchBar onChange={jest.fn()} />);
    expect(screen.getByLabelText(/search by name or symbol/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name or symbol/i)).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = jest.fn();
    render(<SearchBar onChange={onChange} />);
    const input = screen.getByPlaceholderText(/search by name or symbol/i);
    fireEvent.change(input, { target: { value: 'btc' } });
    expect(onChange).toHaveBeenCalledWith('btc');
  });

  it('shows and works clear button', () => {
    const onChange = jest.fn();
    render(<SearchBar onChange={onChange} />);
    const input = screen.getByPlaceholderText(/search by name or symbol/i);
    fireEvent.change(input, { target: { value: 'btc' } });
    const clearBtn = screen.getByRole('button', { name: /clear search/i });
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith('');
    expect((input as HTMLInputElement).value).toBe('');
  });
});
