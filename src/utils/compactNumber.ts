export function compactNumber(value: number, currency: string = '$'): string {
  if (value >= 1_000_000_000_000) return `${currency}${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `${currency}${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${currency}${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${currency}${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}
