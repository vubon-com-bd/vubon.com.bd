/**
 * FormInput Component - Form integrated input with validation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/forms/FormInput
 * 
 * RULES:
 * ✅ ONLY UI form input wrapper - NO business logic
 * ✅ NO API calls, NO form validation logic
 * ✅ Pure controlled/uncontrolled component
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support
 */

import React from 'react';
import { Input, type InputProps } from '../ui/Input';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface FormInputProps extends Omit<InputProps, 'onChange' | 'value' | 'onBlur'> {
  /** Input name attribute */
  name: string;
  /** Current value (controlled) */
  value?: string;
  /** Change handler */
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler for validation */
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  /** Error message */
  error?: string;
  /** Whether field has been touched for error display */
  touched?: boolean;
  /** Helper text / hint */
  hint?: string;
  /** Label text (rendered by Input component) */
  label?: string;
  /** Whether field is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

// ==================== Component ====================

/**
 * FormInput - Form-integrated input with validation error display
 * 
 * @example
 * // Basic usage with react-hook-form
 * <FormInput
 *   name="email"
 *   label="Email Address"
 *   value={values.email}
 *   onChange={(val) => setFieldValue('email', val)}
 *   onBlur={() => setFieldTouched('email', true)}
 *   error={errors.email}
 *   touched={touched.email}
 *   required
 * />
 * 
 * @example
 * // With hint text
 * <FormInput
 *   name="username"
 *   label="Username"
 *   hint="This will be your public display name"
 *   placeholder="johndoe"
 * />
 * 
 * @example
 * // Password input with show/hide
 * <FormInput
 *   name="password"
 *   label="Password"
 *   type="password"
 *   showPasswordToggle
 * />
 */
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      value,
      onChange,
      onBlur,
      error,
      touched,
      hint,
      label,
      required,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const showError = touched && error;
    const generatedId = React.useId();
    const inputId = props.id || name || generatedId;
    const errorId = showError ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value, e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    };

    return (
      <Input
        ref={ref}
        id={inputId}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label={label}
        error={showError ? error : undefined}
        hint={hint}
        required={required}
        disabled={disabled}
        aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
        aria-invalid={showError}
        className={className}
        containerClassName={containerClassName}
        {...props}
      />
    );
  }
);

FormInput.displayName = 'FormInput';

// ==================== FormPhoneInput ====================

export interface FormPhoneInputProps extends Omit<FormInputProps, 'type'> {
  /** Country code for phone number formatting */
  countryCode?: string;
  /** Whether to show country code selector */
  showCountrySelect?: boolean;
}

/**
 * FormPhoneInput - Phone number input with country code (Bangladesh specific)
 * 
 * @example
 * <FormPhoneInput
 *   name="phoneNumber"
 *   label="Phone Number"
 *   countryCode="BD"
 *   placeholder="1712345678"
 *   value={values.phoneNumber}
 *   onChange={(val) => setFieldValue('phoneNumber', val)}
 * />
 */
export const FormPhoneInput = React.forwardRef<HTMLInputElement, FormPhoneInputProps>(
  ({ countryCode = 'BD', showCountrySelect = false, ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = React.useState(countryCode);
    
    return (
      <div className="flex gap-2">
        {showCountrySelect && (
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-24 rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="BD">🇧🇩 +880</option>
            <option value="US">🇺🇸 +1</option>
            <option value="GB">🇬🇧 +44</option>
            <option value="IN">🇮🇳 +91</option>
          </select>
        )}
        <div className="flex-1">
          <FormInput ref={ref} {...props} />
        </div>
      </div>
    );
  }
);

FormPhoneInput.displayName = 'FormPhoneInput';

// ==================== FormOtpInput ====================

export interface FormOtpInputProps {
  name: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * FormOtpInput - OTP input component for verification codes (Bangladesh specific)
 * 
 * @example
 * <FormOtpInput
 *   name="otpCode"
 *   length={6}
 *   value={otpCode}
 *   onChange={setOtpCode}
 *   onComplete={(code) => verifyOtp(code)}
 *   error={errors.otpCode}
 *   touched={touched.otpCode}
 * />
 */
export const FormOtpInput = React.forwardRef<HTMLDivElement, FormOtpInputProps>(
  ({ name, length = 6, value = '', onChange, onComplete, error, touched, disabled, className }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(value.split('').slice(0, length));
    const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
    const showError = touched && error;

    // Sync external value changes
    React.useEffect(() => {
      if (value) {
        const newOtp = value.split('').slice(0, length);
        while (newOtp.length < length) newOtp.push('');
        setOtp(newOtp);
      } else {
        setOtp(Array(length).fill(''));
      }
    }, [value, length]);

    const handleChange = (index: number, val: string) => {
      if (disabled) return;
      
      const newOtp = [...otp];
      newOtp[index] = val.slice(-1);
      setOtp(newOtp);
      
      const otpString = newOtp.join('');
      onChange?.(otpString);
      
      if (otpString.length === length && onComplete) {
        onComplete(otpString);
      }
      
      // Auto-focus next input
      if (val && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, length);
      const pastedOtp = pastedData.split('');
      const newOtp = [...otp];
      
      for (let i = 0; i < length && i < pastedOtp.length; i++) {
        newOtp[i] = pastedOtp[i];
      }
      
      setOtp(newOtp);
      const otpString = newOtp.join('');
      onChange?.(otpString);
      
      if (otpString.length === length && onComplete) {
        onComplete(otpString);
      }
      
      // Focus last filled input or next empty
      const lastFilledIndex = newOtp.findLastIndex((v) => v);
      const focusIndex = Math.min(lastFilledIndex + 1, length - 1);
      inputsRef.current[focusIndex]?.focus();
    };

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {Array.from({ length }, (_, index) => (
            <input
              key={`${name}-${index}`}
              ref={(el) => { inputsRef.current[index] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={otp[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={disabled}
              className={cn(
                'h-12 w-12 text-center text-lg font-semibold rounded-lg border',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                'dark:bg-gray-800 dark:text-white',
                showError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-label={`Digit ${index + 1} of ${length}`}
            />
          ))}
        </div>
        
        {showError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormOtpInput.displayName = 'FormOtpInput';
