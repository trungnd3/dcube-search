import { MouseEventHandler } from 'react';
import { cn } from '../../lib/util';
import Highlighter from 'react-highlight-words';

interface SearchSuggestionProps {
  searchTerms: string[],
  suggestions: string[];
  error: string;
  doSearch: (text: string) => void;
  activeIndex: number;
}

export default function SearchSuggestion({
  searchTerms,
  suggestions,
  error,
  doSearch,
  activeIndex,
}: SearchSuggestionProps) {
  const itemClickHandler: MouseEventHandler<HTMLLIElement> = (event) => {
    doSearch(event.currentTarget.innerText);
  };

  return (
    <div className='absolute bg-white shadow-secondary w-full top-[1px] left-0 rounded-lg rounded-t-none' data-testid="search-suggestion">
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
                <Highlighter
                  highlightClassName=' font-bold bg-transparent leading-6'
                  activeClassName='font-extrabold'
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={suggestion}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
