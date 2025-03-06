import Container from './Container';

export default function Banner() {
  return (
    <Container className='bg-[#F0F0F0]'>
      <div className='w-4 h-4'>
        <img src='/singaporelion.svg' alt='Logo' className='w-full h-full' />
      </div>
      <span>An Official Website of the Singapore Government</span>
    </Container>
  );
}
