import { KeyboardEventHandler } from 'react';
import { Suggestion } from '../../interface/suggestion';
import LoadingSpinner from '../ui/LoadingSpinner';
import { cn } from '../../lib/util';

interface SearchSuggestionProps {
  data: Suggestion | null;
  loading: boolean;
  error: string;
  onKeyUp: KeyboardEventHandler<HTMLInputElement | HTMLLIElement>;
  activeIndex: number;
}

export default function SearchSuggestion({
  data,
  loading,
  error,
  onKeyUp,
  activeIndex
}: SearchSuggestionProps) {

  return (
    <div className='absolute bg-white shadow-primary w-full top-[1px] left-0 rounded-lg rounded-t-none'>
      {!!data && loading && <LoadingSpinner />}
      {!loading && !error && data?.suggestions && data.suggestions.length > 0 && (
        <ul className='flex flex-col'>
          {data.suggestions.map((suggestion, index) => (
            <li key={suggestion} className={cn('cursor-pointer px-4 py-2', activeIndex === index ? 'bg-slate-300' : '')} onKeyUp={onKeyUp}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
