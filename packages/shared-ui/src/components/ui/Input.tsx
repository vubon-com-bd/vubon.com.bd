/**
 * Input Component - Reusable input with label and error
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Input
 * 
 * RULES:
 * ✅ ONLY UI input component - NO business logic
 * ✅ NO validation schema, API validation, form submit logic
 * ✅ Pure UI component
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support (aria-invalid, aria-describedby)
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text / hint */
  helperText?: string;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether input is full width */
  fullWidth?: boolean;
  /** Whether to show character count */
  showCharCount?: boolean;
  /** Maximum character count (for char count display) */
  maxLength?: number;
  /** Current value (for char count) */
  value?: string;
  /** On clear callback for clearable input */
  onClear?: () => void;
  /** Clearable input (shows X button) */
  clearable?: boolean;
  /** Input variant */
  variant?: 'default' | 'filled' | 'flushed';
}

// ==================== Size Classes ====================

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
};

const leftIconSizeClasses = {
  sm: 'pl-8',
  md: 'pl-9',
  lg: 'pl-10',
};

const rightIconSizeClasses = {
  sm: 'pr-8',
  md: 'pr-9',
  lg: 'pr-10',
};

const variantClasses = {
  default: 'border border-gray-300 bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-500',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:focus:bg-gray-700',
  flushed: 'border-0 border-b border-gray-300 rounded-none px-0 focus:border-b-2 focus:border-primary-500 focus:ring-0 dark:border-gray-600',
};

// ==================== Component ====================

/**
 * Input - Reusable input component with label, error, and icons
 * 
 * @example
 * // Basic input
 * <Input placeholder="Enter your email" />
 * 
 * @example
 * // With label and error
 * <Input
 *   label="Email Address"
 *   placeholder="user@example.com"
 *   error={errors.email}
 *   helperText="We'll never share your email"
 * />
 * 
 * @example
 * // With left/right icons
 * <Input
 *   leftIcon={<MailIcon />}
 *   rightIcon={<EyeIcon />}
 *   placeholder="Enter email"
 * />
 * 
 * @example
 * // Clearable input
 * <Input
 *   value={search}
 *   onChange={(e) => setSearch(e.target.value)}
 *   clearable
 *   onClear={() => setSearch('')}
 * />
 * 
 * @example
 * // Password input with toggle
 * <Input
 *   type={showPassword ? 'text' : 'password'}
 *   rightIcon={
 *     <button onClick={() => setShowPassword(!showPassword)}>
 *       {showPassword ? <EyeOffIcon /> : <EyeIcon />}
 *     </button>
 *   }
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      size = 'md',
      fullWidth = true,
      showCharCount = false,
      maxLength,
      value,
      onClear,
      clearable = false,
      variant = 'default',
      id,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    const charCount = typeof value === 'string' ? value.length : 0;
    const showClear = clearable && !disabled && typeof value === 'string' && value.length > 0;

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            aria-invalid={!!error}
            aria-describedby={cn(errorId, helperId) || undefined}
            className={cn(
              'w-full rounded-md shadow-sm transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              sizeClasses[size],
              variantClasses[variant],
              leftIcon && leftIconSizeClasses[size],
              (rightIcon || showClear) && rightIconSizeClasses[size],
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          
          {showClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear input"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {rightIcon && !showClear && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {rightIcon}
            </div>
          )}
        </div>
        
        {showCharCount && maxLength && (
          <div className="mt-1 text-right text-xs text-gray-400">
            {charCount} / {maxLength}
          </div>
        )}
        
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

Input.displayName = 'Input';

// ================= = PasswordInput ====================

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  /** Whether to show password toggle */
  showToggle?: boolean;
}

/**
 * PasswordInput - Specialized input for passwords with show/hide toggle
 * 
 * @example
 * <PasswordInput
 *   label="Password"
 *   placeholder="Enter your password"
 *   showToggle
 * />
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleIcon = showPassword ? (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    ) : (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {toggleIcon}
          </button>
        )}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
