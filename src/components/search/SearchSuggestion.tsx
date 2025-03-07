import { Suggestion } from '../../interface/suggestion';
import LoadingSpinner from '../ui/LoadingSpinner';

interface SearchSuggestionProps {
  data: Suggestion | null;
  loading: boolean;
  error: string;
}

export default function SearchSuggestion({
  data,
  loading,
  error,
}: SearchSuggestionProps) {

  return (
    <div className='absolute bg-white shadow-primary w-full top-[1px] left-0 p-4'>
      {!!data && loading && <LoadingSpinner />}
      {!loading && !error && data?.suggestions && data.suggestions.length > 0 && (
        <ul className='flex flex-col gap-2'>
          {data.suggestions.map((suggestion) => (
            <li key={suggestion} className='cursor-pointer'>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
