/**
 * Form Component - Form wrapper with layout
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/forms/Form
 * 
 * RULES:
 * ✅ ONLY form layout and wrapper - NO business logic
 * ✅ NO zod schema, API call, login mutation, auth state
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Form submission handler */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Vertical spacing between form fields */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether form is submitting (disables inputs) */
  isSubmitting?: boolean;
  /** Whether form is disabled */
  isDisabled?: boolean;
  /** Whether form is read-only */
  isReadOnly?: boolean;
  /** Form ID for accessibility */
  formId?: string;
}

export interface FormFieldProps {
  children: React.ReactNode;
  /** Error message to display */
  error?: string;
  /** Success message to display */
  success?: string;
  /** Hint text for additional guidance */
  hint?: string;
  /** Whether field is required */
  required?: boolean;
  /** Label for the field (used for accessibility) */
  label?: string;
  /** Field ID (for linking label and input) */
  fieldId?: string;
  className?: string;
}

export interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  /** Alignment of action buttons */
  align?: 'left' | 'right' | 'center' | 'between';
  /** Whether to add divider line above actions */
  withDivider?: boolean;
  /** Whether actions are sticky at bottom */
  sticky?: boolean;
}

export interface FormSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export interface FormDividerProps {
  className?: string;
}

// ==================== Spacing Classes ====================

const spacingClasses = {
  none: 'space-y-0',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
};

const alignClasses = {
  left: 'justify-start',
  right: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
};

// ==================== Component ====================

/**
 * Form wrapper component with layout and spacing
 * 
 * @example
 * <Form onSubmit={handleSubmit} spacing="md" isSubmitting={loading}>
 *   <FormField label="Email" required error={errors.email}>
 *     <Input name="email" type="email" />
 *   </FormField>
 *   <FormActions align="right">
 *     <Button variant="outline" type="button">Cancel</Button>
 *     <Button type="submit">Submit</Button>
 *   </FormActions>
 * </Form>
 */
export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  spacing = 'md',
  isSubmitting = false,
  isDisabled = false,
  isReadOnly = false,
  formId,
  className,
  ...props
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSubmitting && !isDisabled) {
      onSubmit(e);
    }
  };

  // Clone children to pass disabled/readonly state if needed
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Pass down form context if needed
      return React.cloneElement(child, {
        ...child.props,
        disabled: isDisabled || isSubmitting,
        readOnly: isReadOnly,
      });
    }
    return child;
  });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className={cn(spacingClasses[spacing], className)}
      noValidate
      {...props}
    >
      {enhancedChildren}
    </form>
  );
};

// ==================== Form Field ====================

/**
 * Form field wrapper with label, error, hint, and success messages
 * 
 * @example
 * <FormField 
 *   label="Email Address" 
 *   required 
 *   error={errors.email}
 *   hint="We'll never share your email"
 * >
 *   <Input name="email" type="email" />
 * </FormField>
 */
export const FormField: React.FC<FormFieldProps> = ({
  children,
  error,
  success,
  hint,
  required,
  label,
  fieldId,
  className,
}) => {
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;
  const hasHint = !!hint && !hasError && !hasSuccess;

  // Generate unique ID for accessibility if not provided
  const generatedId = React.useId();
  const inputId = fieldId || generatedId;
  const errorId = hasError ? `${inputId}-error` : undefined;
  const hintId = hasHint ? `${inputId}-hint` : undefined;

  // Clone children to add aria attributes
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      return React.cloneElement(child, {
        id: inputId,
        'aria-describedby': [errorId, hintId].filter(Boolean).join(' ') || undefined,
        'aria-invalid': hasError,
        required,
      });
    }
    return child;
  });

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">{enhancedChildren}</div>
      
      {hasHint && (
        <p id={hintId} className="text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
      
      {hasError && (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      
      {hasSuccess && (
        <p className="text-sm text-green-600 dark:text-green-400">
          {success}
        </p>
      )}
    </div>
  );
};

// ==================== Form Actions ====================

/**
 * Form actions container for buttons
 * 
 * @example
 * <FormActions align="right" withDivider sticky>
 *   <Button variant="outline" type="button">Cancel</Button>
 *   <Button type="submit">Save Changes</Button>
 * </FormActions>
 */
export const FormActions: React.FC<FormActionsProps> = ({
  children,
  className,
  align = 'right',
  withDivider = false,
  sticky = false,
}) => {
  return (
    <div className={cn({ 'border-t border-gray-200 dark:border-gray-700 pt-4': withDivider })}>
      <div
        className={cn(
          'flex space-x-3',
          alignClasses[align],
          { 'sticky bottom-0 bg-white dark:bg-gray-900 py-4': sticky },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

// ==================== Form Section ====================

/**
 * Form section with title and description
 * 
 * @example
 * <FormSection 
 *   title="Personal Information" 
 *   description="Please provide your personal details"
 * >
 *   <FormField label="Name">
 *     <Input name="name" />
 *   </FormField>
 * </FormSection>
 */
export const FormSection: React.FC<FormSectionProps> = ({
  children,
  title,
  description,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// ==================== Form Divider ====================

/**
 * Horizontal divider for form sections
 */
export const FormDivider: React.FC<FormDividerProps> = ({ className }) => {
  return <hr className={cn('my-6 border-gray-200 dark:border-gray-700', className)} />;
};

// ==================== Display Names ====================

Form.displayName = 'Form';
FormField.displayName = 'FormField';
FormActions.displayName = 'FormActions';
FormSection.displayName = 'FormSection';
FormDivider.displayName = 'FormDivider';
