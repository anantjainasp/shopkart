import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', href, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
        'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
        'border border-gray-300 bg-transparent hover:bg-gray-100': variant === 'outline',
      },
      {
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4': size === 'md',
        'h-12 px-6 text-lg': size === 'lg',
      },
      className
    );

    if (href) {
      return (
        <Link to={href} className={baseStyles}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={baseStyles}
        {...props}
      />
    );
  }
);