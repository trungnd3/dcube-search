import { ReactNode } from 'react';
import Header from './Header';
import Container from './Container';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='flex-1 '>
        <Container className='pt-12 h-full'>{children}</Container>
      </main>
    </>
  );
}
