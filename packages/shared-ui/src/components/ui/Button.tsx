/**
 * Button Component - Reusable button with variants
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-ui/src/components/ui/Button

 * RULES:
 * ✅ ONLY UI button component - NO business logic
 * ✅ NO API calls, auth redirect, business logic
 * ✅ Pure UI component
 * ✅ TypeScript strict with forwardRef
 * ✅ Class-variance-authority for variant management
 * ✅ Supports asChild (polymorphic) pattern for rendering as child component
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ==================== Styles ====================

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 focus-visible:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600',
        secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-200',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100',
        danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600',
        success: 'bg-green-600 text-white shadow-sm hover:bg-green-700 focus-visible:ring-green-500 dark:bg-green-700 dark:hover:bg-green-600',
        warning: 'bg-yellow-500 text-white shadow-sm hover:bg-yellow-600 focus-visible:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-500',
        link: 'text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500 dark:text-primary-400',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-9 w-9 p-0',
        'icon-sm': 'h-7 w-7 p-0 text-xs',
        'icon-lg': 'h-11 w-11 p-0 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
        none: 'rounded-none',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'default',
    },
  }
);

// ==================== Types ====================

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'as'>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner */
  loading?: boolean;
  /** Icon on the left side */
  leftIcon?: React.ReactNode;
  /** Icon on the right side */
  rightIcon?: React.ReactNode;
  /** Loading text (defaults to "Loading...") */
  loadingText?: string;
  /** As element (polymorphic) */
  as?: 'button' | 'a';
  /** Render as child component (for Link components) */
  asChild?: boolean;
  /** Target for link variant */
  target?: string;
  /** Rel for link variant */
  rel?: string;
  /** href for link variant */
  href?: string;
}

// ==================== Spinner Component ====================

const Spinner: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  const spinnerSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
  };

  return (
    <svg
      className={cn('animate-spin', spinnerSizes[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
};

// ==================== Component ====================

/**
 * Button - Reusable button component with multiple variants and sizes
 *
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * @example
 * // With icons
 * <Button leftIcon={<PlusIcon />} rightIcon={<ArrowIcon />}>
 *   Add Item
 * </Button>
 *
 * @example
 * // Loading state
 * <Button loading loadingText="Saving...">
 *   Save Changes
 * </Button>
 *
 * @example
 * // Link as button
 * <Button as="a" href="/login" variant="outline">
 *   Sign In
 * </Button>
 *
 * @example
 * // Using asChild with Next.js Link
 * <Button asChild>
 *   <Link href="/dashboard">Dashboard</Link>
 * </Button>
 *
 * @example
 * // Danger action
 * <Button variant="danger" size="lg">
 *   Delete Account
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      loading,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      as = 'button',
      asChild = false,
      target,
      rel,
      href,
      ...props
    },
    ref
  ) => {
    const isLink = as === 'a';
    const isDisabled = disabled || loading;
    const spinnerSize = size === 'xs' || size === 'icon-sm' ? 'sm' : 'md';
    const displayLoadingText = loadingText || (typeof children === 'string' ? children : 'Loading...');

    // For asChild pattern, render the child with merged props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(buttonVariants({ variant, size, fullWidth, rounded }), className),
        'aria-disabled': isDisabled,
        ...(isDisabled && { 'data-disabled': '' }),
        ...props,
      });
    }

    // For link variant as 'a'
    if (isLink) {
      return (
        <a
          className={cn(buttonVariants({ variant, size, fullWidth, rounded, className }))}
          href={href}
          target={target}
          rel={rel}
          ref={ref as any}
          aria-disabled={isDisabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {renderContent({ loading, leftIcon, rightIcon, children, loadingText: displayLoadingText, spinnerSize })}
        </a>
      );
    }

    // Default button
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, rounded, className }))}
        ref={ref}
        disabled={isDisabled}
        type={props.type || 'button'}
        {...props}
      >
        {renderContent({ loading, leftIcon, rightIcon, children, loadingText: displayLoadingText, spinnerSize })}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Helper function to render button content
const renderContent = ({
  loading,
  leftIcon,
  rightIcon,
  children,
  loadingText,
  spinnerSize,
}: {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  loadingText: string;
  spinnerSize: 'sm' | 'md';
}) => {
  if (loading) {
    return (
      <>
        <span className={cn(children && 'mr-2')}>
          <Spinner size={spinnerSize} />
        </span>
        {loadingText}
      </>
    );
  }

  return (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );
};

// ==================== IconButton ====================

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  /** Icon to display */
  icon: React.ReactNode;
  /** Accessible label */
  'aria-label': string;
}

/**
 * IconButton - Button with only an icon
 *
 * @example
 * <IconButton
 *   icon={<CloseIcon />}
 *   aria-label="Close dialog"
 *   variant="ghost"
 *   size="icon"
 * />
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, 'aria-label': ariaLabel, children, ...props }, ref) => {
    return (
      <Button ref={ref} leftIcon={icon} aria-label={ariaLabel} {...props}>
        {undefined}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

// ==================== ButtonGroup ====================

export interface ButtonGroupProps {
  children: React.ReactNode;
  /** Spacing between buttons */
  spacing?: 'sm' | 'md' | 'lg';
  /** Orientation of button group */
  orientation?: 'horizontal' | 'vertical';
  /** Whether buttons should be attached (no spacing, merged borders) */
  attached?: boolean;
  className?: string;
}

const groupSpacingClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

const groupOrientationClasses = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
};

/**
 * ButtonGroup - Group of buttons with consistent spacing
 *
 * @example
 * <ButtonGroup spacing="md">
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save</Button>
 * </ButtonGroup>
 *
 * @example
 * // Attached buttons (like segmented control)
 * <ButtonGroup attached>
 *   <Button variant="outline">Day</Button>
 *   <Button variant="outline">Week</Button>
 *   <Button variant="primary">Month</Button>
 * </ButtonGroup>
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  spacing = 'md',
  orientation = 'horizontal',
  attached = false,
  className,
}) => {
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    if (attached) {
      const isHorizontal = orientation === 'horizontal';
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;

      return React.cloneElement(child, {
        className: cn(
          child.props.className,
          !isHorizontal && 'rounded-none first:rounded-t-md last:rounded-b-md',
          isHorizontal && 'rounded-none first:rounded-l-md last:rounded-r-md',
          isHorizontal && !isFirst && '-ml-px',
          !isHorizontal && !isFirst && '-mt-px'
        ),
      });
    }

    return child;
  });

  return (
    <div
      className={cn(
        'flex',
        groupOrientationClasses[orientation],
        !attached && groupSpacingClasses[spacing],
        attached && 'inline-flex',
        className
      )}
    >
      {enhancedChildren}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
