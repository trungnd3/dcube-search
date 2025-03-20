import { ReactNode } from 'react';
import Header from './Header';
import LayoutContainer from './LayoutContainer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='flex-1 '>
        <LayoutContainer className='pt-12 h-full'>{children}</LayoutContainer>
      </main>
    </>
  );
}
