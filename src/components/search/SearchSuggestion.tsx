import { MouseEventHandler } from 'react';
import { cn } from '../../lib/util';

interface SearchSuggestionProps {
  suggestions: string[];
  error: string;
  // onChangeActiveIndex: (key: string, len: number) => void;
  doSearch: (text: string) => void;
  activeIndex: number;
}

export default function SearchSuggestion({
  suggestions,
  error,
  // onChangeActiveIndex,
  doSearch,
  activeIndex,
}: SearchSuggestionProps) {
  const itemClickHandler: MouseEventHandler<HTMLLIElement> = (event) => {
    doSearch(event.currentTarget.innerText);
  };

  return (
    <div className='absolute bg-white shadow-primary w-full top-[1px] left-0 rounded-lg rounded-t-none'>
      {!error && (
        <ul className='flex flex-col'>
          {suggestions &&
            suggestions.length > 0 &&
            suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={cn(
                  'cursor-pointer px-4 py-2 hover:bg-primary-fade-1',
                  activeIndex === index ? 'bg-primary-fade-2' : ''
                )}
                onClick={itemClickHandler}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
