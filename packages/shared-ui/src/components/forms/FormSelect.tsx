/**
 * FormSelect Component - Form integrated select with validation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/forms/FormSelect
 * 
 * RULES:
 * ✅ ONLY UI form select wrapper - NO business logic
 * ✅ NO API calls, NO form validation logic
 * ✅ Pure controlled/uncontrolled component
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support
 */

import React from 'react';
import { Select, type SelectProps } from '../ui/Select';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export type SelectOptions = Option[] | OptionGroup[];

export interface FormSelectProps extends Omit<SelectProps, 'onChange' | 'value' | 'options'> {
  /** Input name attribute */
  name: string;
  /** Current value (controlled) */
  value?: string;
  /** Change handler */
  onChange?: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Blur handler for validation */
  onBlur?: (event?: React.FocusEvent<HTMLSelectElement>) => void;
  /** Error message */
  error?: string;
  /** Whether field has been touched for error display */
  touched?: boolean;
  /** Helper text / hint */
  hint?: string;
  /** Label text */
  label?: string;
  /** Whether field is required */
  required?: boolean;
  /** Select options */
  options: SelectOptions;
  /** Placeholder text (shown as disabled option) */
  placeholder?: string;
  /** Whether select is searchable (renders combobox) */
  searchable?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

// ==================== Helper Functions ====================

const isOptionGroup = (item: Option | OptionGroup): item is OptionGroup => {
  return 'options' in item && Array.isArray(item.options);
};

const flattenOptions = (options: SelectOptions): Option[] => {
  const flat: Option[] = [];
  for (const item of options) {
    if (isOptionGroup(item)) {
      flat.push(...item.options);
    } else {
      flat.push(item);
    }
  }
  return flat;
};

// ==================== Searchable Select ====================

interface SearchableSelectProps {
  id: string;
  name: string;
  value: string;
  options: SelectOptions;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const SearchableSelect = React.forwardRef<HTMLInputElement, SearchableSelectProps>(
  ({ id, name, value, options, onChange, onBlur, placeholder, disabled, required, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    const flatOptions = flattenOptions(options);
    const selectedOption = flatOptions.find((opt) => opt.value === value);
    const filteredOptions = flatOptions.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
      onChange(option.value);
      setIsOpen(false);
      setSearchTerm('');
    };

    return (
      <div ref={containerRef} className="relative">
        <div
          className={cn(
            'flex cursor-pointer items-center justify-between rounded-md border bg-white px-3 py-2 dark:bg-gray-800',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className={cn(!selectedOption && 'text-gray-400')}>
            {selectedOption?.label || placeholder || 'Select an option'}
          </span>
          <svg
            className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <input
              ref={ref}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full border-b border-gray-200 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      'cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                      option.value === value && 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        <input type="hidden" name={name} value={value} required={required} />
      </div>
    );
  }
);

SearchableSelect.displayName = 'SearchableSelect';

// ==================== Component ====================

/**
 * FormSelect - Form-integrated select with validation error display
 * 
 * @example
 * // Basic usage
 * <FormSelect
 *   name="country"
 *   label="Country"
 *   options={[
 *     { value: 'bd', label: 'Bangladesh' },
 *     { value: 'us', label: 'United States' },
 *   ]}
 *   value={values.country}
 *   onChange={(val) => setFieldValue('country', val)}
 *   error={errors.country}
 *   touched={touched.country}
 *   required
 * />
 * 
 * @example
 * // With option groups
 * <FormSelect
 *   name="category"
 *   label="Category"
 *   options={[
 *     { label: 'Electronics', options: [
 *       { value: 'phones', label: 'Phones' },
 *       { value: 'laptops', label: 'Laptops' },
 *     ]},
 *     { label: 'Fashion', options: [
 *       { value: 'men', label: "Men's" },
 *       { value: 'women', label: "Women's" },
 *     ]},
 *   ]}
 * />
 * 
 * @example
 * // Searchable select
 * <FormSelect
 *   name="product"
 *   label="Product"
 *   options={productOptions}
 *   searchable
 *   placeholder="Search for a product..."
 * />
 */
export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      name,
      value = '',
      onChange,
      onBlur,
      error,
      touched,
      hint,
      label,
      required,
      options,
      placeholder,
      searchable = false,
      isLoading = false,
      disabled,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const showError = touched && error;
    const generatedId = React.useId();
    const selectId = props.id || name || generatedId;
    const errorId = showError ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value, e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      onBlur?.(e);
    };

    const renderOptions = (opts: SelectOptions): React.ReactNode => {
      return opts.map((item, idx) => {
        if (isOptionGroup(item)) {
          return (
            <optgroup key={idx} label={item.label}>
              {item.options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          );
        }
        return (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        );
      });
    };

    return (
      <div className={cn('flex flex-col space-y-1', containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        {searchable ? (
          <SearchableSelect
            ref={ref as React.Ref<HTMLInputElement>}
            id={selectId}
            name={name}
            value={value}
            options={options}
            onChange={(val) => onChange?.(val)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={cn(showError && 'border-red-500', className)}
          />
        ) : (
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled || isLoading}
            required={required}
            aria-invalid={showError}
            aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
            className={cn(
              'rounded-md border bg-white px-3 py-2 text-sm shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
              'dark:border-gray-600 dark:bg-gray-800 dark:text-white',
              'disabled:cursor-not-allowed disabled:opacity-50',
              showError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {renderOptions(options)}
          </select>
        )}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" />
            Loading options...
          </div>
        )}
        
        {hint && !showError && (
          <p id={hintId} className="text-xs text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
        
        {showError && (
          <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
