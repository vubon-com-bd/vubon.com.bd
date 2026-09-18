'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { SearchInput } from '../../components/forms/SearchInput';
import { cn } from '../../utils/cn';

export interface SearchBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'onSubmit'
> {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSubmit?: (value: string) => void;
  readonly placeholder?: string;
  readonly actions?: ReactNode;
  readonly disabled?: boolean;
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(function SearchBar(
  { value, onChange, onSubmit, placeholder = 'Search…', actions, disabled, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="search"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...rest}
    >
      <div className="min-w-[16rem] flex-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(value);
          }}
        >
          <SearchInput
            value={value}
            placeholder={placeholder}
            {...(disabled !== undefined && { disabled })}
            onChange={(e) => onChange(e.target.value)}
            onClear={() => onChange('')}
            aria-label="Search"
          />
        </form>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
