'use client';
import { forwardRef, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

export interface ContextMenuItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly onSelect?: () => void;
  readonly disabled?: boolean;
  readonly destructive?: boolean;
}

export interface ContextMenuProps {
  readonly children: ReactNode;
  readonly items: readonly ContextMenuItem[];
  readonly className?: string;
}

interface Point {
  readonly x: number;
  readonly y: number;
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(function ContextMenu(
  { children, items, className },
  ref
) {
  const [point, setPoint] = useState<Point | null>(null);

  useEffect(() => {
    if (!point) return;
    const close = (): void => setPoint(null);
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setPoint(null);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [point]);

  return (
    <>
      <div
        ref={ref}
        onContextMenu={(e) => {
          e.preventDefault();
          setPoint({ x: e.clientX, y: e.clientY });
        }}
      >
        {children}
      </div>
      {point &&
        typeof document !== 'undefined' &&
        createPortal(
          <ul
            role="menu"
            style={{ position: 'fixed', left: point.x, top: point.y }}
            className={cn(
              'z-[1600] min-w-[10rem] rounded-md border border-slate-200 bg-white p-1 shadow-lg',
              className
            )}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {items.map((item) => (
              <li key={item.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    item.onSelect?.();
                    setPoint(null);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-sm',
                    item.destructive
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-slate-700 hover:bg-slate-100',
                    item.disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
});

ContextMenu.displayName = 'ContextMenu';
