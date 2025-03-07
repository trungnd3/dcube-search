import { Search, XIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const key = searchParams.get('key') || '';
  const [searchText, setSearchText] = useState(key);

  const searchTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
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
      <div className='group flex rounded-lg border border-[#E0E4E5] h-full has-focus-visible:border-primary'>
        <div className='flex-1 flex justify-between px-4'>
          <input
            className='focus-visible:border-none focus-visible:outline-none flex-1'
            value={searchText}
            onChange={searchTextChangeHandler}
          />
          <span className='relative flex justify-center items-center cursor-pointer'>
            {!!searchText && <XIcon size={22} className='absolute' />}
          </span>
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
