'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  readonly value: string;
  readonly label: ReactNode;
  readonly disabled?: boolean;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly items: readonly TabItem[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly orientation?: 'horizontal' | 'vertical';
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, value, onChange, orientation = 'horizontal', className, ...rest },
  ref,
) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const enabled = items.filter((t) => !t.disabled);
    const idx = enabled.findIndex((t) => t.value === value);
    if (idx === -1) return;
    const isHorizontal = orientation === 'horizontal';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    if (e.key === prevKey) {
      e.preventDefault();
      const prev = enabled[(idx - 1 + enabled.length) % enabled.length];
      if (prev) onChange(prev.value);
    } else if (e.key === nextKey) {
      e.preventDefault();
      const next = enabled[(idx + 1) % enabled.length];
      if (next) onChange(next.value);
    }
  };

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={onKeyDown}
      className={cn(
        'flex gap-1',
        orientation === 'horizontal'
          ? 'flex-row border-b border-slate-200'
          : 'flex-col border-r border-slate-200',
        className,
      )}
      {...rest}
    >
      {items.map((item) => (
        <button
          key={item.value}
          role="tab"
          type="button"
          disabled={item.disabled}
          aria-selected={item.value === value}
          tabIndex={item.value === value ? 0 : -1}
          onClick={() => onChange(item.value)}
          className={cn(
            'px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50',
            orientation === 'horizontal' ? '-mb-px border-b-2' : '-mr-px border-r-2',
            item.value === value
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-slate-900',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
});

Tabs.displayName = 'Tabs';

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: string;
  readonly activeValue: string;
  readonly children: ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel({ value, activeValue, children, className, ...rest }, ref) {
    if (value !== activeValue) return null;
    return (
      <div ref={ref} role="tabpanel" className={cn('p-3', className)} {...rest}>
        {children}
      </div>
    );
  },
);

TabPanel.displayName = 'TabPanel';
