/**
 * Switch Component - Toggle switch
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Switch
 * 
 * RULES:
 * ✅ ONLY UI toggle component - NO business logic
 * ✅ NO API calls, form validation
 * ✅ Pure UI component
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support (role="switch", aria-checked)
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface SwitchProps {
  /** Checked state (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether switch is disabled */
  disabled?: boolean;
  /** Switch size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Whether to show icons (sun/moon for dark mode) */
  showIcons?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** ID for accessibility */
  id?: string;
  /** Name attribute for forms */
  name?: string;
  /** Required attribute */
  required?: boolean;
}

// ==================== Sizes ====================

const trackClasses = {
  xs: 'h-4 w-7',
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-14',
};

const thumbClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const thumbTranslate = {
  xs: 'translate-x-3',
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-7',
};

// ==================== Icons ====================

const CheckIcon: React.FC = () => (
  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon: React.FC = () => (
  <svg className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ==================== Component ====================

/**
 * Switch - Toggle switch component
 * 
 * @example
 * // Uncontrolled
 * <Switch defaultChecked label="Enable notifications" />
 * 
 * @example
 * // Controlled
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * 
 * @example
 * // With icons (dark mode toggle)
 * <Switch
 *   checked={isDark}
 *   onCheckedChange={setIsDark}
 *   showIcons
 *   label="Dark Mode"
 *   labelPosition="left"
 * />
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      size = 'md',
      label,
      labelPosition = 'right',
      showIcons = false,
      className,
      id,
      name,
      required,
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;
    const switchId = id || `switch-${React.useId()}`;

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !checked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    };

    const switchElement = (
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        name={name}
        aria-checked={checked}
        aria-required={required}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          trackClasses[size],
          checked ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-flex items-center justify-center transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out dark:bg-gray-100',
            thumbClasses[size],
            checked && thumbTranslate[size]
          )}
        >
          {showIcons && (
            <span className="scale-75">
              {checked ? <CheckIcon /> : <XIcon />}
            </span>
          )}
        </span>
      </button>
    );

    if (!label) {
      return switchElement;
    }

    return (
      <label
        htmlFor={switchId}
        className={cn(
          'inline-flex cursor-pointer items-center',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        {labelPosition === 'left' && (
          <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </span>
        )}
        {switchElement}
        {labelPosition === 'right' && (
          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

// ==================== SwitchGroup ====================

export interface SwitchGroupProps {
  /** Label for the group */
  label?: string;
  /** Description for the group */
  description?: string;
  /** Switch items */
  children: React.ReactNode;
  /** Direction of switches */
  direction?: 'horizontal' | 'vertical';
  /** Additional CSS classes */
  className?: string;
}

/**
 * SwitchGroup - Group of switches with label
 * 
 * @example
 * <SwitchGroup label="Notifications" description="Manage your notification preferences">
 *   <Switch label="Email notifications" />
 *   <Switch label="SMS notifications" />
 *   <Switch label="Push notifications" />
 * </SwitchGroup>
 */
export const SwitchGroup: React.FC<SwitchGroupProps> = ({
  label,
  description,
  children,
  direction = 'vertical',
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {(label || description) && (
        <div>
          {label && (
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      )}
      <div
        className={cn(
          direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'
        )}
      >
        {children}
      </div>
    </div>
  );
};

SwitchGroup.displayName = 'SwitchGroup';
