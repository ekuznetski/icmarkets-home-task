import { urls } from './config';
import { CryptoSymbol } from '../domain/types/CryptoSymbol';
import { CryptoSymbolDetails } from '../domain/types/CryptoSymbol';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type FetchWithRevalidateOptions = {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  revalidate: number;
};

async function fetchWithRevalidate<T>(
  url: string,
  { method = RequestMethod.GET, body, headers, revalidate }: FetchWithRevalidateOptions,
): Promise<T> {
  const fetchOptions: RequestInit & { next: { revalidate: number } } = {
    method,
    headers,
    next: { revalidate },
  };
  if (body !== undefined) {
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    fetchOptions.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }
  const res = await fetch(url, fetchOptions);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function getSymbolsRequest(): Promise<Record<string, CryptoSymbol>> {
  const data = await fetchWithRevalidate<CryptoSymbol[]>(urls.cryptoSymbols, { revalidate: 600 });
  return data.reduce<Record<string, CryptoSymbol>>((acc, symbol) => {
    acc[symbol.id] = symbol;
    return acc;
  }, {});
}

export async function getSymbolDetailsRequest(id: string): Promise<CryptoSymbolDetails> {
  const url = `${urls.symbolDetails}${id}`;
  return fetchWithRevalidate<CryptoSymbolDetails>(url, { revalidate: 600 });
}
