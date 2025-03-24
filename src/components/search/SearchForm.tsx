import { Search, XIcon } from 'lucide-react';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRequest } from '../../hooks/use-request';
import SearchSuggestion from './SearchSuggestion';
import LoadingSpinner from '../ui/LoadingSpinner';
import { cn, findSuggestions } from '../../lib/util';

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const key = searchParams.get('key') || '';
  const [searchText, setSearchText] = useState(key);
  const [suggesting, setSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestIndex, setActiveSuggestIndex] = useState(-1);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const searchSuggestionRef = useRef<HTMLDivElement>(null);

  const { request, response } = useRequest();
  const { loading, error } = response;

  const bodyClickHandler = useCallback((e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('form')) {
      e.preventDefault();
      setSuggesting(false);
      setActiveSuggestIndex(-1);
      searchBoxRef.current?.blur();
      document.body.classList.remove('overflow-hidden');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', bodyClickHandler);

    return () => {
      window.removeEventListener('click', bodyClickHandler);
    };
  }, [bodyClickHandler]);

  useEffect(() => {
    if (activeSuggestIndex === -1) {
      searchBoxRef.current?.focus();
      searchSuggestionRef.current?.blur();
    } else {
      searchBoxRef.current?.blur();
      searchSuggestionRef.current?.focus();
    }
  }, [activeSuggestIndex]);

  useEffect(() => {
    if (suggesting) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [suggesting]);

  const searchTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchText(value);

    if (value.length >= 2) {
      setSuggesting(true);
      // Fetch search suggestions
      request(import.meta.env.VITE_QUERY_RESULT_ENDPOINT!, {
        onSuccess: (data) => {
          const foundSuggestions = findSuggestions(searchText, data);
          setSuggestions(foundSuggestions);
        },
      });
    } else {
      setSuggesting(false);
    }
  };

  const dismissHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Close suggestion
    setSuggesting(false);

    // Clear input, stay focus
    setSearchText('');

    searchBoxRef.current?.focus();
  };

  const changeActiveSuggestIndex = (eventKey: string, len: number) => {
    if (eventKey === 'ArrowDown') {
      if (activeSuggestIndex < len - 1) {
        setActiveSuggestIndex((prev) => prev + 1);
      } else {
        setActiveSuggestIndex(-1);
      }
    } else if (eventKey === 'ArrowUp') {
      if (activeSuggestIndex > -1) {
        setActiveSuggestIndex((prev) => prev - 1);
      } else {
        setActiveSuggestIndex(len - 1);
      }
    }
  };

  const doSearch = (searchText: string) => {
    setSearchText(searchText);
    setSuggesting(false);
    setActiveSuggestIndex(-1);
    navigate(searchText ? `/search-result?key=${searchText}` : `/`);
  };

  const keyDownHandler: KeyboardEventHandler<
    HTMLInputElement | HTMLLIElement | HTMLDivElement
  > = (event) => {
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      if (!!suggestions && suggestions.length > 0) {
        changeActiveSuggestIndex(event.key, suggestions.length);
      }
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const item = event.currentTarget.querySelector(
        `li:nth-of-type(${activeSuggestIndex + 1})`
      ) as HTMLLIElement;
      doSearch(item.innerText);
    }
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    navigate(searchText ? `/search-result?key=${searchText}` : `/`);
  };

  return (
    <form
      className='w-full h-14 font-semibold text-lg leading-[26px]'
      onSubmit={submitHandler}
      data-testid='search-form'
    >
      <div
        className={cn(
          'group flex rounded-lg border border-[#E0E4E5] h-full has-focus-visible:border-primary',
          suggesting ? 'rounded-bl-none' : ''
        )}
      >
        <div className='flex-1 flex flex-col'>
          <div className='flex-1 flex justify-between pl-4 pr-6'>
            <input
              className='focus-visible:border-none focus-visible:outline-none flex-1'
              autoComplete='off'
              spellCheck={false}
              value={searchText ?? ''}
              onChange={searchTextChangeHandler}
              onKeyDown={keyDownHandler}
              ref={searchBoxRef}
              data-testid='search-input'
            />
            <div className='relative flex justify-center items-center'>
              {!!searchText && !loading && (
                <button
                  className='absolute w-6 h-6 focus-visible:rounded-full cursor-pointer flex justify-center items-center'
                  type='button'
                  onClick={dismissHandler}
                  data-testid='dismiss-button'
                >
                  <XIcon size={22} className='right-0' />
                </button>
              )}
              {loading && (
                <div className='absolute w-6 h-6 focus-visible:rounded-full cursor-pointer flex justify-center items-center'>
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
          {suggesting && (
            <div
              className='relative'
              ref={searchSuggestionRef}
              onKeyDown={keyDownHandler}
              data-testid='suggestion-container'
              tabIndex={-1}
            >
              <SearchSuggestion
                searchTerms={searchText.split(' ')}
                suggestions={suggestions}
                error={error}
                doSearch={doSearch}
                activeIndex={activeSuggestIndex}
              />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='rounded-lg bg-primary text-white px-9 flex gap-1 items-center cursor-pointer lightbold'
          data-testid='submit-button'
        >
          <div className='w-[26px] h-[26px] flex justify-center items-center'>
            <Search size={18} />
          </div>
          <span className='hidden md:block'>Search</span>
        </button>
      </div>
    </form>
  );
}
