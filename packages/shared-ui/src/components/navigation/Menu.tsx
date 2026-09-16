'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface MenuItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly icon?: ReactNode;
  readonly disabled?: boolean;
  readonly destructive?: boolean;
  readonly onSelect?: () => void;
}

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  readonly items: readonly MenuItem[];
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu(
  { items, className, ...rest },
  ref,
) {
  return (
    <ul
      ref={ref}
      role="menu"
      className={cn(
        'flex min-w-[10rem] flex-col rounded-md border border-slate-200 bg-white p-1 shadow-md',
        className,
      )}
      {...rest}
    >
      {items.map((item) => (
        <li key={item.id} role="none">
          <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={item.onSelect}
            className={cn(
              'flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-sm transition-colors',
              item.destructive ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-100',
              item.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
});

Menu.displayName = 'Menu';
