import { useEffect } from 'react';

import { useRequest } from '../../hooks/use-request';
import LoadingSpinner from '../ui/LoadingSpinner';
import { DocumentResult } from '../../interface/document';
import SearchResultItem from './SearchResultItem';

interface SearchResultProps {
  searchKey: string;
}

export default function SearchResult({ searchKey }: SearchResultProps) {
  console.log(searchKey);

  const { request, response } = useRequest<DocumentResult>();

  useEffect(() => {
    request(import.meta.env.VITE_QUERY_RESULT_ENDPOINT!);
  }, [request]);

  const {data, loading, error} = response;

  if (!data) {
    return <LoadingSpinner />
  }

  const firstNumber = (data.Page - 1) * data.PageSize + 1;
  const lastNumber = (firstNumber - 1) + data.PageSize;

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading &&
        !error &&
        !!data.ResultItems.length &&
        data.ResultItems.length > 0 && (
          <div className='block'>
            <h1 className='semibold'>Showing {firstNumber} - {lastNumber} of {data.TotalNumberOfResults} results</h1>
            <ul className='py-12 flex flex-col gap-12'>
              {data.ResultItems.map((item) => (
                <li key={item.DocumentId} className='flex flex-col gap-2'>
                  <SearchResultItem
                    title={item.DocumentTitle}
                    excerpt={item.DocumentExcerpt}
                    uri={item.DocumentURI}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
}
