/**
 * Select Component - Reusable dropdown select
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Select
 * 
 * RULES:
 * ✅ ONLY UI select component - NO business logic
 * ✅ NO API calls, form validation
 * ✅ Pure UI component
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support
 */

import React from 'react';
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

// ==================== Size Classes ====================

const sizeClasses = {
  sm: 'px-2 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
};

// ==================== Component ====================

/**
 * Select - Reusable dropdown select component
 * 
 * @example
 * // Basic select
 * <Select
 *   label="Country"
 *   options={[
 *     { value: 'bd', label: 'Bangladesh' },
 *     { value: 'us', label: 'United States' },
 *   ]}
 *   placeholder="Select a country"
 * />
 * 
 * @example
 * // With error and helper text
 * <Select
 *   label="Category"
 *   options={categories}
 *   error={errors.category}
 *   helperText="Choose a product category"
 * />
 * 
 * @example
 * // With Bengali labels
 * <Select
 *   label="District"
 *   options={districts}
 *   locale="bn"
 *   placeholder="জেলা নির্বাচন করুন"
 * />
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
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
    const selectId = id || `select-${React.useId()}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value, e);
    };

    const getOptionLabel = (option: SelectOption): string => {
      if (locale === 'bn' && option.labelBn) {
        return option.labelBn;
      }
      return option.label;
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
                {getOptionLabel(option)}
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

// ==================== SelectGroup ====================

export interface SelectGroupOption {
  label: string;
  options: SelectOption[];
}

export interface SelectGroupProps extends Omit<SelectProps, 'options'> {
  groups: SelectGroupOption[];
}

/**
 * SelectGroup - Select with grouped options (optgroup)
 * 
 * @example
 * <SelectGroup
 *   label="Category"
 *   groups={[
 *     { label: 'Electronics', options: [...], },
 *     { label: 'Fashion', options: [...], },
 *   ]}
 * />
 */
export const SelectGroup = React.forwardRef<HTMLSelectElement, SelectGroupProps>(
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

// ==================== AsyncSelect ====================

export interface AsyncSelectProps extends Omit<SelectProps, 'options' | 'onChange'> {
  /** Async function to load options */
  loadOptions: (search: string) => Promise<SelectOption[]>;
  /** Debounce delay in ms */
  debounceDelay?: number;
  /** Loading text */
  loadingText?: string;
  /** No results text */
  noResultsText?: string;
  /** On change handler */
  onChange?: (value: string, option?: SelectOption) => void;
}

/**
 * AsyncSelect - Select with async option loading (searchable)
 * 
 * @example
 * <AsyncSelect
 *   label="Search Product"
 *   loadOptions={async (search) => {
 *     const results = await searchProducts(search);
 *     return results.map(p => ({ value: p.id, label: p.name }));
 *   }}
 *   placeholder="Type to search..."
 * />
 */
export const AsyncSelect = React.forwardRef<HTMLSelectElement, AsyncSelectProps>(
  ({ loadOptions, debounceDelay = 300, loadingText = 'Loading...', noResultsText = 'No results found', onChange, ...props }, ref) => {
    const [options, setOptions] = React.useState<SelectOption[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const debounceTimer = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await loadOptions(searchTerm);
          setOptions(results);
        } catch (error) {
          console.error('Failed to load options:', error);
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

    const handleChange = (value: string) => {
      const selectedOption = options.find((opt) => opt.value === value);
      onChange?.(value, selectedOption);
    };

    const displayOptions = isLoading ? [] : options;

    return (
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={props.placeholder || 'Search...'}
          className={cn(
            'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800'
          )}
        />
        {isLoading && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-2 text-center text-sm text-gray-500 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {loadingText}
          </div>
        )}
        {!isLoading && searchTerm && displayOptions.length === 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-2 text-center text-sm text-gray-500 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {noResultsText}
          </div>
        )}
        {!isLoading && displayOptions.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {displayOptions.map((option) => (
              <button
                key={option.value}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        <Select
          ref={ref}
          options={displayOptions}
          onChange={handleChange}
          className="hidden"
          {...props}
        />
      </div>
    );
  }
);

AsyncSelect.displayName = 'AsyncSelect';
