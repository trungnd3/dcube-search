import { Link } from 'react-router-dom';
import LayoutContainer from './LayoutContainer';

export default function Banner() {

  return (
    <LayoutContainer
      className='bg-[#F0F0F0]'
      innerClassName='justify-center lg:justify-start items-center'
    >
      <Link className='w-4 md:w-8 h-4 md:h-8 cursor-pointer' to='/'>
        <img src='/singaporelion.svg' alt='Singapore Government Logo' className='w-full h-full' />
      </Link>
      <span>An Official Website of the Singapore Government</span>
    </LayoutContainer>
  );
}
