'use client';
import { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react';
import { Menu, type MenuItem } from './Menu';
import { cn } from '../../utils/cn';

export interface DropdownMenuProps {
  readonly trigger: ReactNode;
  readonly items: readonly MenuItem[];
  readonly align?: 'left' | 'right';
  readonly className?: string;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu({ trigger, items, align = 'left', className }, ref) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const setRef = (node: HTMLDivElement | null): void => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (!open) return;
      const onDoc = (e: MouseEvent): void => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      const onKey = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('mousedown', onDoc);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onDoc);
        document.removeEventListener('keydown', onKey);
      };
    }, [open]);

    return (
      <div ref={setRef} className={cn('relative inline-block', className)}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center"
        >
          {trigger}
        </button>
        {open && (
          <div
            className={cn(
              'absolute top-full z-[1500] mt-1',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            <Menu
              items={items.map((item) => ({
                ...item,
                onSelect: () => {
                  item.onSelect?.();
                  setOpen(false);
                },
              }))}
            />
          </div>
        )}
      </div>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';
