import { Search, XIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react';

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');

  const searchTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value)
  }

  return (
    <form className='w-full h-14 font-semibold text-lg leading-[26px]'>
      <div className='group flex rounded-lg border border-[#E0E4E5] h-full has-focus-visible:border-[#1C76D5]'>
        <div className="flex-1 flex justify-between px-4">
          <input className="focus-visible:border-none focus-visible:outline-none flex-1" value={searchText} onChange={searchTextChangeHandler}/>
          {!!searchText && (
            <span className='flex justify-center items-center cursor-pointer'>
              <XIcon size={22} />
          </span>
          )}
        </div>
        <button
          type='submit'
          className='rounded-lg bg-[#1C76D5] text-white px-9 flex gap-1 items-center'
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
