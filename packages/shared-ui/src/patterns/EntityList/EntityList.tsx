'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface EntityListItem {
  readonly id: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly meta?: ReactNode;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
}

export interface EntityListProps extends HTMLAttributes<HTMLUListElement> {
  readonly items: readonly EntityListItem[];
  readonly emptyState?: ReactNode;
  readonly dividers?: boolean;
}

export const EntityList = forwardRef<HTMLUListElement, EntityListProps>(
  function EntityList({ items, emptyState, dividers = true, className, ...rest }, ref) {
    if (items.length === 0 && emptyState) return <>{emptyState}</>;
    return (
      <ul
        ref={ref}
        role="list"
        className={cn('flex flex-col', className)}
        {...rest}
      >
        {items.map((item) => {
          const Wrapper = item.href ? 'a' : item.onClick ? 'button' : 'div';
          return (
            <li
              key={item.id}
              className={cn(dividers && 'border-b border-slate-100 last:border-b-0')}
            >
              <Wrapper
                {...(item.href ? { href: item.href } : {})}
                {...(item.onClick && !item.href
                  ? { type: 'button' as const, onClick: item.onClick }
                  : {})}
                className={cn(
                  'flex w-full items-center gap-3 py-3 text-left',
                  (item.href || item.onClick) &&
                    'transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                )}
              >
                {item.leading && <span className="shrink-0">{item.leading}</span>}
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium text-slate-900">{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-slate-500">{item.description}</span>
                  )}
                  {item.meta && <span className="text-xs text-slate-400">{item.meta}</span>}
                </div>
                {item.trailing && <span className="shrink-0">{item.trailing}</span>}
              </Wrapper>
            </li>
          );
        })}
      </ul>
    );
  },
);

EntityList.displayName = 'EntityList';
