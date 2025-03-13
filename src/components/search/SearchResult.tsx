import { useEffect } from 'react';
import { useRequest } from '../../hooks/use-request';
import LoadingSpinner from '../ui/LoadingSpinner';
import SearchResultItem from './SearchResultItem';

interface SearchResultProps {
  searchKey: string;
}

export default function SearchResult({ searchKey }: SearchResultProps) {
  const { request, response } = useRequest();

  useEffect(() => {
    request(import.meta.env.VITE_QUERY_RESULT_ENDPOINT!);
  }, [request]);

  const { data, loading, error } = response;


  if (!data || (!!data && loading)) {
    return <LoadingSpinner />;
  } else if (error) {
    return <div>No result.</div>;
  }

  const firstNumber = (data.Page - 1) * data.PageSize + 1;
  const lastNumber = firstNumber - 1 + data.PageSize;

  return (
    <>
      {!!data.ResultItems.length && data.ResultItems.length > 0 && (
        <div className='block' data-testid="search-result">
          <h1 className='semibold'>
            Showing {firstNumber} - {lastNumber} of {data.TotalNumberOfResults}{' '}
            results
          </h1>
          <ul className='py-12 flex flex-col gap-12'>
            {data.ResultItems.map((item) => (
              <li key={item.DocumentId} className='flex flex-col gap-2'>
                <SearchResultItem
                  searchTearms={searchKey.split(' ')}
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
