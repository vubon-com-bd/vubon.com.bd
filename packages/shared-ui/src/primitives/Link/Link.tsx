import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { LinkProps } from './link.types';

const underlineClasses = {
  always: 'underline underline-offset-4',
  hover: 'hover:underline underline-offset-4',
  never: 'no-underline',
} as const;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    { external, underline = 'hover', className, children, ...rest },
    ref,
  ) {
    const isExternal =
      external ??
      (typeof rest.href === 'string' &&
        /^https?:\/\//.test(rest.href));

    return (
      <a
        ref={ref}
        className={cn(
          'text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
          underlineClasses[underline],
          className,
        )}
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        {...rest}
      >
        {children}
        {isExternal && (
          <span aria-hidden="true" className="ml-0.5 text-xs">
            ↗
          </span>
        )}
      </a>
    );
  },
);

Link.displayName = 'Link';
