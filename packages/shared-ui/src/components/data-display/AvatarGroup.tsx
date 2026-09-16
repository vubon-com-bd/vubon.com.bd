'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { Avatar, type AvatarSize } from '../../primitives/Avatar';
import { cn } from '../../utils/cn';

export interface AvatarGroupItem {
  readonly id: string;
  readonly src?: string;
  readonly alt: string;
  readonly name?: string;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  readonly items: readonly AvatarGroupItem[];
  readonly max?: number;
  readonly size?: AvatarSize;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ items, max = 4, size = 'md', className, ...rest }, ref) {
    const visible = items.slice(0, max);
    const overflow = items.length - visible.length;

    return (
      <div ref={ref} className={cn('inline-flex -space-x-2', className)} {...rest}>
        {visible.map((item) => (
          <span
            key={item.id}
            className="rounded-full ring-2 ring-white"
            title={item.name ?? item.alt}
          >
            <Avatar
              {...(item.src !== undefined && { src: item.src })}
              {...(item.name !== undefined && { name: item.name })}
              alt={item.alt}
              size={size}
            />
          </span>
        ))}
        {overflow > 0 && (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-700 ring-2 ring-white">
            +{overflow}
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
