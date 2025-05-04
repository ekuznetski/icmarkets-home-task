import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 300,
): (...args: Args) => void {
  const debouncedFn = useRef(fn);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    debouncedFn.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    // TODO: add cancel function and return tuple of resultFn and cancelFn
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (debouncedFn.current) {
        timeoutRef.current = setTimeout(() => {
          debouncedFn.current(...args);
        }, delay);
      }
    },
    [delay],
  );
}
