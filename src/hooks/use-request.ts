import { useCallback, useState } from 'react';

export function useRequest<T>() {
  const [response, setResponse] = useState<{
    loading: boolean,
    error: string;
    data: T | null
  }>({
    loading: false,
    error: '',
    data: null,
  });

  const request = useCallback(async (endpoint: string) => {
    setResponse((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(endpoint);

      const data = await res.json();
      setResponse((prev) => ({
        ...prev,
        data,
      }));
    } catch (error) {
      setResponse((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unexpected error.',
      }));
    } finally {
      setResponse((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  return { request, response };
}
