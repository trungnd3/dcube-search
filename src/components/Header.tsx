import Banner from './Banner';
import Container from './Container';
import SearchForm from './SearchForm';

export default function Header() {
  return (
    <header className='fixed top-0 w-full'>
      <Banner />
      <Container className='bg-[#FFFFFF] shadow-[0_4px_8px_#E0E4E559] py-12'>
        <SearchForm />
      </Container>
    </header>
  );
}
