'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  readonly open?: boolean;
  readonly onClose?: () => void;
  readonly width?: number;
  readonly children: ReactNode;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { open = true, onClose, width = 240, className, children, ...rest },
  ref,
) {
  return (
    <>
      {open && onClose && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-[1300] bg-black/40 md:hidden"
        />
      )}
      <aside
        ref={ref}
        aria-label="Sidebar"
        style={{ width }}
        className={cn(
          'flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-transform',
          'fixed inset-y-0 left-0 z-[1350] md:static md:z-auto',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className,
        )}
        {...rest}
      >
        {children}
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export interface NavItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly href?: string;
  readonly icon?: ReactNode;
  readonly active?: boolean;
  readonly disabled?: boolean;
}

export interface NavListProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  readonly items: readonly NavItem[];
  readonly onSelect?: (id: string) => void;
}

export const NavList = forwardRef<HTMLUListElement, NavListProps>(
  function NavList({ items, onSelect, className, ...rest }, ref) {
    return (
      <ul ref={ref} role="list" className={cn('flex flex-col gap-0.5 p-2', className)} {...rest}>
        {items.map((item) => {
          const content = (
            <>
              {item.icon && <span aria-hidden="true">{item.icon}</span>}
              <span>{item.label}</span>
            </>
          );
          return (
            <li key={item.id}>
              {item.href ? (
                <a
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  aria-disabled={item.disabled || undefined}
                  onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors',
                    item.active
                      ? 'bg-blue-50 font-medium text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100',
                    item.disabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  disabled={item.disabled}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={() => onSelect?.(item.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
                    item.active
                      ? 'bg-blue-50 font-medium text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100',
                    item.disabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    );
  },
);

NavList.displayName = 'NavList';
