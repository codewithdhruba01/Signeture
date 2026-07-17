import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full bg-neutral-900 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
