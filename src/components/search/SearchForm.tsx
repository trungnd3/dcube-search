import { Search, XIcon } from 'lucide-react';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useRequest } from '../../hooks/use-request';
import { Suggestion } from '../../interface/suggestion';
import SearchSuggestion from './SearchSuggestion';
import LoadingSpinner from '../ui/LoadingSpinner';
import { cn } from '../../lib/util';

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const key = searchParams.get('key') || '';
  const [searchText, setSearchText] = useState(key);
  const [suggesting, setSuggesting] = useState(false);
  const [activeSuggestIndex, setActiveSuggestIndex] = useState(-1);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const searchSuggestionRef = useRef<HTMLDivElement>(null);

  const { request, response } = useRequest<Suggestion>();
  const { data, loading, error } = response;

  useEffect(() => {
    function bodyClickHandler(this: Window, e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('form')) {
        e.preventDefault();
        setSuggesting(false);
        setActiveSuggestIndex(-1);
        searchBoxRef.current?.blur();
        document.body.classList.remove('overflow-hidden');
      }
    }

    window.addEventListener('click', bodyClickHandler);

    return () => {
      window.removeEventListener('click', bodyClickHandler);
    };
  }, []);

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
      request(import.meta.env.VITE_SUGGESTION_ENDPOINT!);
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

  const keyUpHandler: KeyboardEventHandler<
    HTMLInputElement | HTMLLIElement | HTMLDivElement
  > = (event) => {
    event.preventDefault();

    if (!!data && !!data.suggestions && data.suggestions.length > 0) {
      const len = data.suggestions.length;
      if (event.key === 'ArrowDown') {
        if (activeSuggestIndex < len - 1) {
          setActiveSuggestIndex((prev) => prev + 1);
        } else {
          setActiveSuggestIndex(-1);
        }
      } else if (event.key === 'ArrowUp') {
        if (activeSuggestIndex > -2) {
          setActiveSuggestIndex((prev) => prev - 1);
        } else {
          setActiveSuggestIndex(len - 1);
        }
      }
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
              value={searchText}
              onChange={searchTextChangeHandler}
              onKeyUp={keyUpHandler}
              ref={searchBoxRef}
            />
            <div className='relative flex justify-center items-center'>
              {!!searchText && !loading && (
                <button
                  className='absolute w-6 h-6 focus-visible:rounded-full cursor-pointer flex justify-center items-center'
                  type='button'
                  onClick={dismissHandler}
                >
                  <XIcon size={22} className='right-0' />
                </button>
              )}
              {!!data && loading && (
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
              onKeyUp={keyUpHandler}
              tabIndex={0}
            >
              <SearchSuggestion
                data={data}
                loading={loading}
                error={error}
                onKeyUp={keyUpHandler}
                activeIndex={activeSuggestIndex}
              />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='rounded-lg bg-primary text-white px-9 flex gap-1 items-center cursor-pointer lightbold'
        >
          <div className='w-[26px] h-[26px] flex justify-center items-center'>
            <Search size={18} />
          </div>
          Search
        </button>
      </div>
    </form>
  );
}
