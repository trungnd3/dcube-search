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
    async (
      endpoint: string,
      options?: {
        onSuccess?: (data: DocumentResult) => void,
        onFilterData?: (data: DocumentResult) => DocumentResult,
      }
    ) => {
      setResponse((prev) => ({ ...prev, loading: true }));
      try {
        const res = await fetch(endpoint);

        let data: DocumentResult = await res.json();

        if (options && options.onFilterData) {
          data = options.onFilterData(data);
        }

        setResponse((prev) => ({
          ...prev,
          data,
        }));

        if (options && options.onSuccess) {
          options.onSuccess(data);
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
