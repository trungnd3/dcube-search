import { useCallback, useState } from 'react';
import { DocumentResult } from '../interface/document';

export function useRequest() {
  const [response, setResponse] = useState<{
    loading: boolean;
    error: string;
    data: DocumentResult | null;
  }>({
    loading: false,
    error: '',
    data: null,
  });

  const request = useCallback(
    async (endpoint: string, onSuccess?: (data: DocumentResult) => void) => {
      setResponse((prev) => ({ ...prev, loading: true }));
      try {
        const res = await fetch(endpoint);

        const data: DocumentResult = await res.json();

        setResponse((prev) => ({
          ...prev,
          data
        }))

        if (onSuccess) {
          onSuccess(data);
        }
      } catch (error) {
        setResponse((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Unexpected error.',
        }));
      } finally {
        setResponse((prev) => ({ ...prev, loading: false }));
      }
    },
    []
  );

  return { request, response };
}
