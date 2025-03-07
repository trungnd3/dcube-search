import { Link } from 'react-router';
import Container from './Container';

export default function Banner() {

  return (
    <Container
      className='bg-[#F0F0F0]'
      innerClassName='justify-center md:justify-start items-center'
    >
      <Link className='w-4 h-4 cursor-pointer' to='/'>
        <img src='/singaporelion.svg' alt='Logo' className='w-full h-full' />
      </Link>
      <span>An Official Website of the Singapore Government</span>
    </Container>
  );
}
