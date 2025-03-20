import { ReactNode } from 'react';
import { cn } from '../../lib/util';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export default function Container({ children, className, innerClassName }: ContainerProps) {
  return (
    <div
      className={cn('w-full py-1 flex justify-center', className)}
      data-testid="container"
    >
      <div className={cn('w-[90%] lg:w-[77%] flex gap-2', innerClassName)}>
        {children}
      </div>
    </div>
  );
}
