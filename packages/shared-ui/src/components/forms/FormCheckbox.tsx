/**
 * FormCheckbox Component - Checkbox with label and validation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/forms/FormCheckbox
 * 
 * RULES:
 * ✅ ONLY UI checkbox component - NO business logic
 * ✅ NO API calls, NO form validation logic
 * ✅ Pure controlled/uncontrolled component
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface FormCheckboxProps {
  /** Input name attribute */
  name: string;
  /** Label text */
  label?: string;
  /** Checkbox value */
  value?: string;
  /** Checked state (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Error message */
  error?: string;
  /** Whether field has been touched for error display */
  touched?: boolean;
  /** Whether checkbox is disabled */
  disabled?: boolean;
  /** Whether checkbox is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Helper text / hint */
  hint?: string;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Checkbox color variant */
  variant?: 'primary' | 'success' | 'danger' | 'warning';
  /** Indeterminate state */
  indeterminate?: boolean;
  /** ID for accessibility */
  id?: string;
}

// ==================== Size Classes ====================

const sizeClasses = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const labelSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const variantClasses = {
  primary: 'text-primary-600 focus:ring-primary-500 border-gray-300',
  success: 'text-green-600 focus:ring-green-500 border-gray-300',
  danger: 'text-red-600 focus:ring-red-500 border-gray-300',
  warning: 'text-yellow-600 focus:ring-yellow-500 border-gray-300',
};

// ==================== Component ====================

/**
 * FormCheckbox - Accessible checkbox with label and validation error display
 * 
 * @example
 * // Controlled
 * <FormCheckbox
 *   name="agree"
 *   label="I agree to the terms"
 *   checked={agreed}
 *   onChange={setAgreed}
 *   error={errors.agree}
 *   touched={touched.agree}
 * />
 * 
 * @example
 * // Uncontrolled
 * <FormCheckbox
 *   name="newsletter"
 *   label="Subscribe to newsletter"
 *   defaultChecked={true}
 * />
 * 
 * @example
 * // With hint and required
 * <FormCheckbox
 *   name="marketing"
 *   label="Receive marketing emails"
 *   hint="You can unsubscribe anytime"
 *   required
 * />
 */
export const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  (
    {
      name,
      label,
      value,
      checked,
      defaultChecked = false,
      onChange,
      error,
      touched,
      disabled,
      required,
      className,
      hint,
      size = 'md',
      variant = 'primary',
      indeterminate = false,
      id,
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const showError = touched && error;
    
    // Generate unique ID for accessibility
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = showError ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked, e);
    };

    // Handle indeterminate state
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div className={cn('flex flex-col', className)}>
        <label
          htmlFor={inputId}
          className={cn(
            'inline-flex cursor-pointer items-start',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              id={inputId}
              type="checkbox"
              name={name}
              value={value}
              checked={isChecked}
              onChange={handleChange}
              disabled={disabled}
              required={required}
              aria-invalid={!!showError}
              aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
              aria-label={label || name}
              className={cn(
                'rounded focus:outline-none focus:ring-2 focus:ring-offset-0',
                sizeClasses[size],
                variantClasses[variant],
                disabled && 'cursor-not-allowed opacity-50',
                showError && 'border-red-500 focus:ring-red-500'
              )}
            />
          </div>
          
          {label && (
            <span
              className={cn(
                'ml-2 text-gray-700 dark:text-gray-300',
                labelSizeClasses[size],
                disabled && 'text-gray-400 dark:text-gray-500'
              )}
            >
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </span>
          )}
        </label>
        
        {hint && !showError && (
          <p id={hintId} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
        
        {showError && (
          <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

// ==================== FormCheckboxGroup ====================

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormCheckboxGroupProps {
  name: string;
  label?: string;
  options: CheckboxOption[];
  values?: string[];
  defaultValues?: string[];
  onChange?: (values: string[]) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

const layoutClasses = {
  horizontal: 'flex flex-row flex-wrap gap-4',
  vertical: 'flex flex-col space-y-2',
};

/**
 * FormCheckboxGroup - Group of checkboxes for multiple selection
 * 
 * @example
 * <FormCheckboxGroup
 *   name="interests"
 *   label="Select your interests"
 *   options={[
 *     { value: 'tech', label: 'Technology' },
 *     { value: 'fashion', label: 'Fashion' },
 *     { value: 'food', label: 'Food' },
 *   ]}
 *   values={selectedInterests}
 *   onChange={setSelectedInterests}
 * />
 */
export const FormCheckboxGroup = React.forwardRef<HTMLDivElement, FormCheckboxGroupProps>(
  (
    {
      name,
      label,
      options,
      values = [],
      defaultValues = [],
      onChange,
      error,
      touched,
      disabled,
      required,
      className,
      layout = 'vertical',
    },
    ref
  ) => {
    const [internalValues, setInternalValues] = React.useState<string[]>(defaultValues);
    const isControlled = values !== undefined;
    const selectedValues = isControlled ? values : internalValues;
    const showError = touched && error;
    
    const generatedId = React.useId();
    const groupId = `${name}-${generatedId}`;
    const errorId = showError ? `${groupId}-error` : undefined;

    const handleCheckboxChange = (checkboxValue: string, checked: boolean) => {
      let newValues: string[];
      if (checked) {
        newValues = [...selectedValues, checkboxValue];
      } else {
        newValues = selectedValues.filter((v) => v !== checkboxValue);
      }
      
      if (!isControlled) {
        setInternalValues(newValues);
      }
      onChange?.(newValues);
    };

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        {label && (
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        <div className={layoutClasses[layout]} role="group" aria-labelledby={label ? groupId : undefined}>
          {options.map((option) => (
            <FormCheckbox
              key={option.value}
              name={`${name}.${option.value}`}
              label={option.label}
              checked={selectedValues.includes(option.value)}
              onChange={(checked) => handleCheckboxChange(option.value, checked)}
              disabled={disabled || option.disabled}
              size="sm"
            />
          ))}
        </div>
        
        {showError && (
          <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormCheckboxGroup.displayName = 'FormCheckboxGroup';
