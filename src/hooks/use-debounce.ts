import { useEffect } from 'react';

export function useDebounce({ callback }: { callback: () => void }) {
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      callback();
    }, 500);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [callback]);
}
