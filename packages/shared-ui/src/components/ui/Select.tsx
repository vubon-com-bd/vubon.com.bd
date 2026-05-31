/**
 * Select Component - Reusable dropdown select
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * IMPROVEMENTS:
 * - Added proper TypeScript strict typing
 * - Improved AsyncSelect with keyboard navigation and accessibility
 * - Added Bengali localization support
 * - Added loading and error states for AsyncSelect
 * - Fixed ESLint warnings (no-console, explicit-any)
 * 
 * @module shared-ui/src/components/ui/Select
 */

import React, { forwardRef, useId, useCallback, useRef, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface SelectOption {
  value: string;
  label: string;
  labelBn?: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text / hint */
  helperText?: string;
  /** Select options */
  options: SelectOption[];
  /** Change handler */
  onChange?: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Placeholder text (shown as disabled option) */
  placeholder?: string;
  /** Select size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether select is full width */
  fullWidth?: boolean;
  /** Whether select is required */
  required?: boolean;
  /** Whether select is disabled */
  disabled?: boolean;
  /** Current locale for label selection */
  locale?: 'en' | 'bn';
}

export interface SelectGroupOption {
  label: string;
  options: SelectOption[];
}

export interface SelectGroupProps extends Omit<SelectProps, 'options'> {
  groups: SelectGroupOption[];
}

export interface AsyncSelectProps extends Omit<SelectProps, 'options' | 'onChange'> {
  /** Async function to load options */
  loadOptions: (search: string) => Promise<SelectOption[]>;
  /** Debounce delay in ms (default: 300) */
  debounceDelay?: number;
  /** Loading text (default: 'Loading...') */
  loadingText?: string;
  /** No results text (default: 'No results found') */
  noResultsText?: string;
  /** Error text (default: 'Failed to load options') */
  errorText?: string;
  /** On change handler */
  onChange?: (value: string, option?: SelectOption) => void;
  /** Placeholder for search input */
  searchPlaceholder?: string;
}

// ==================== Size Classes ====================

const sizeClasses: Record<NonNullable<SelectProps['size']>, string> = {
  sm: 'px-2 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
};

// ==================== Helper Functions ====================

const getOptionLabel = (option: SelectOption, locale: 'en' | 'bn'): string => {
  if (locale === 'bn' && option.labelBn) {
    return option.labelBn;
  }
  return option.label;
};

// ==================== Select Component ====================

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      onChange,
      placeholder,
      value,
      id,
      size = 'md',
      fullWidth = true,
      required,
      disabled,
      locale = 'en',
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${useId()}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      onChange?.(e.target.value, e);
    };

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            required={required}
            value={value}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={cn(errorId, helperId) || undefined}
            className={cn(
              'rounded-md border shadow-sm transition-colors duration-200 focus:outline-none focus:ring-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:bg-gray-800 dark:text-white',
              'appearance-none',
              sizeClasses[size],
              fullWidth && 'w-full',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {getOptionLabel(option, locale)}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ==================== SelectGroup Component ====================

export const SelectGroup = forwardRef<HTMLSelectElement, SelectGroupProps>(
  ({ groups, ...props }, ref) => {
    return (
      <Select ref={ref} {...props}>
        {groups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    );
  }
);

SelectGroup.displayName = 'SelectGroup';

// ==================== AsyncSelect Component ====================

/**
 * AsyncSelect - Select with async option loading and keyboard navigation
 * 
 * @example
 * <AsyncSelect
 *   label="Search Product"
 *   loadOptions={async (search) => {
 *     const results = await searchProducts(search);
 *     return results.map(p => ({ value: p.id, label: p.name }));
 *   }}
 *   placeholder="Type to search..."
 *   onChange={(value, option) => console.log('Selected:', option)}
 * />
 */
export const AsyncSelect = forwardRef<HTMLDivElement, AsyncSelectProps>(
  (
    {
      loadOptions,
      debounceDelay = 300,
      loadingText = 'Loading...',
      noResultsText = 'No results found',
      errorText = 'Failed to load options',
      onChange,
      placeholder,
      searchPlaceholder = 'Search...',
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = true,
      required,
      disabled,
      locale = 'en',
      className,
      ...props
    },
    ref
  ) => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    // Load options when search term changes
    useEffect(() => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        setIsLoading(true);
        setIsError(false);
        try {
          const results = await loadOptions(searchTerm);
          setOptions(results);
          setHighlightedIndex(-1);
        } catch (err) {
          // Silent error handling - no console.error in production
          setIsError(true);
          setOptions([]);
        } finally {
          setIsLoading(false);
        }
      }, debounceDelay);

      return () => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
      };
    }, [searchTerm, loadOptions, debounceDelay]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => 
            prev < options.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && options[highlightedIndex]) {
            const selected = options[highlightedIndex];
            setSelectedValue(selected.value);
            setSearchTerm(getOptionLabel(selected, locale));
            setIsOpen(false);
            onChange?.(selected.value, selected);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    }, [isOpen, options, highlightedIndex, locale, onChange]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll highlighted item into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listboxRef.current) {
        const highlightedItem = listboxRef.current.children[highlightedIndex] as HTMLElement;
        highlightedItem?.scrollIntoView({ block: 'nearest' });
      }
    }, [highlightedIndex]);

    const selectId = `async-select-${useId()}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;

    const displayValue = selectedValue 
      ? options.find(o => o.value === selectedValue) 
      : null;

    return (
      <div 
        ref={containerRef}
        className={cn('flex flex-col', fullWidth && 'w-full', className)}
      >
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Search Input */}
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
              if (!selectedValue) {
                setSelectedValue('');
              }
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder || searchPlaceholder}
            className={cn(
              'rounded-md border shadow-sm transition-colors duration-200 focus:outline-none focus:ring-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:bg-gray-800 dark:text-white',
              sizeClasses[size],
              fullWidth && 'w-full',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600',
              'pr-8'
            )}
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={`${selectId}-listbox`}
            aria-describedby={cn(errorId, helperId) || undefined}
          />

          {/* Chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className={cn(
                'h-4 w-4 text-gray-400 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown Listbox */}
          {isOpen && !disabled && (
            <div
              ref={listboxRef}
              id={`${selectId}-listbox`}
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
              role="listbox"
              aria-label="Options"
            >
              {isLoading && (
                <div className="px-3 py-2 text-center text-sm text-gray-500">
                  {loadingText}
                </div>
              )}

              {isError && (
                <div className="px-3 py-2 text-center text-sm text-red-500">
                  {errorText}
                </div>
              )}

              {!isLoading && !isError && options.length === 0 && searchTerm && (
                <div className="px-3 py-2 text-center text-sm text-gray-500">
                  {noResultsText}
                </div>
              )}

              {!isLoading && !isError && options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700',
                    selectedValue === option.value && 'bg-primary-50 dark:bg-primary-900/20',
                    highlightedIndex === index && 'bg-gray-100 dark:bg-gray-700'
                  )}
                  onClick={() => {
                    setSelectedValue(option.value);
                    setSearchTerm(getOptionLabel(option, locale));
                    setIsOpen(false);
                    onChange?.(option.value, option);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  role="option"
                  aria-selected={selectedValue === option.value}
                  tabIndex={-1}
                >
                  {getOptionLabel(option, locale)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hidden select for form submission */}
        <select
          id={selectId}
          name={props.name}
          value={selectedValue}
          required={required}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AsyncSelect.displayName = 'AsyncSelect';

// ==================== Type Exports ====================

export type { SelectOption, SelectProps, SelectGroupProps, AsyncSelectProps };
