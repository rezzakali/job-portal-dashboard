import { cn } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface IconWraperProps {
  children: ReactNode;
  className: string;
}

const IconWrapper: React.FC<IconWraperProps> = ({ children, className }) => (
  <div
    className={cn(
      className,
      'flex items-center rounded-small justify-center w-7 h-7'
    )}
  >
    {children}
  </div>
);

export default IconWrapper;