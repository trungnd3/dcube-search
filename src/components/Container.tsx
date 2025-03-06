import { ReactNode } from 'react';
import { cn } from '../lib/util';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn('w-full py-1 flex justify-center', className)}
    >
      <div className='md:w-[77%] flex justify-center md:justify-start items-center gap-2'>
        {children}
      </div>
    </div>
  );
}
