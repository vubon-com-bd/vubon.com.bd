'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { colorFromString, initialsFromName } from './avatar.utils';
import type { AvatarProps, AvatarSize } from './avatar.types';

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-24 w-24 text-3xl',
  '3xl': 'h-32 w-32 text-4xl',
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size = 'md', fallbackColor, className, ...rest },
  ref
) {
  const initials = name ? initialsFromName(name) : alt.charAt(0).toUpperCase();
  const bg = fallbackColor ?? colorFromString(name ?? alt);

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium text-white',
        sizeClasses[size],
        !src && bg,
        className
      )}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
});

Avatar.displayName = 'Avatar';
