'use client';
import { forwardRef } from 'react';
import { UI_LABELS } from '@vubon/shared-constants/common';
import { Input } from '../../primitives/Input';
import { SearchIcon } from '../../icons/generic/SearchIcon';
import { CloseIcon } from '../../icons/generic/CloseIcon';
import type { InputProps } from '../../primitives/Input';

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  readonly onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { value, onClear, className, ...rest },
  ref
) {
  const hasValue = String(value ?? '').length > 0;
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
        <SearchIcon size="sm" />
      </span>
      <Input
        ref={ref}
        type="search"
        role="searchbox"
        value={value}
        className={`pl-8 ${hasValue ? 'pr-8' : ''} ${className ?? ''}`}
        {...rest}
      />
      {hasValue && onClear && (
        <button
          type="button"
          aria-label={UI_LABELS.COMMON.CLEAR}
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <CloseIcon size="sm" />
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
