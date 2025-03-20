import Banner from './Banner';
import LayoutContainer from './LayoutContainer';
import SearchForm from '../search/SearchForm';

export default function Header() {
  return (
    <header className='sticky top-0 w-full'>
      <Banner />
      <LayoutContainer
        className='bg-white shadow-primary py-12'
        innerClassName='justify-center md:justify-start items-center'
      >
        <SearchForm />
      </LayoutContainer>
    </header>
  );
}
