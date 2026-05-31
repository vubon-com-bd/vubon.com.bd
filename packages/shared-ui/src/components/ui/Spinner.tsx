/**
 * Spinner Component - Loading indicator
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Spinner
 * 
 * RULES:
 * ✅ ONLY UI spinner component - NO business logic
 * ✅ NO API calls, data fetching
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface SpinnerProps {
  /** Spinner size */
  size ? : 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Spinner color variant */
  variant ? : 'default' | 'primary' | 'white' | 'gray';
  /** Additional CSS classes */
  className ? : string;
  /** Label for accessibility (hidden visually) */
  label ? : string;
  /** Whether spinner is full page */
  fullPage ? : boolean;
  /** Speed of animation */
  speed ? : 'slow' | 'normal' | 'fast';
}

// ==================== Sizes ====================

const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

// ==================== Variant Colors ====================

const variantClasses = {
  default: 'text-gray-400',
  primary: 'text-primary-600',
  white: 'text-white',
  gray: 'text-gray-500',
};

// ==================== Speed Classes ====================

const speedClasses = {
  slow: 'animate-spin-slow',
  normal: 'animate-spin',
  fast: 'animate-spin-fast',
};

// ==================== Component ====================

/**
 * Spinner - Loading indicator component
 * 
 * @example
 * // Basic spinner
 * <Spinner />
 * 
 * @example
 * // Primary colored spinner
 * <Spinner variant="primary" size="lg" />
 * 
 * @example
 * // Full page overlay
 * <Spinner fullPage label="Loading..." />
 */
export const Spinner: React.FC < SpinnerProps > = ({
  size = 'md',
  variant = 'default',
  className,
  label = 'Loading...',
  fullPage = false,
  speed = 'normal',
}) => {
  const spinner = (
    <svg
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        speedClasses[speed],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  
  if (fullPage) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
        role="status"
        aria-label={label}
      >
        {spinner}
        {label && (
          <span className="mt-4 text-sm text-white animate-pulse">{label}</span>
        )}
      </div>
    );
  }
  
  return (
    <div role="status" aria-label={label} className="inline-flex">
      {spinner}
      <span className="sr-only">{label}</span>
    </div>
  );
};

Spinner.displayName = 'Spinner';

// ==================== Spinner variants ====================

/**
 * DotSpinner - Dots bouncing loading indicator
 * 
 * @example
 * <DotSpinner size="md" />
 */
export const DotSpinner: React.FC < SpinnerProps > = ({ size = 'md', className }) => {
  const dotSizeClasses = {
    xs: 'h-1 w-1',
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };
  
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full bg-gray-400 dark:bg-gray-500',
            dotSizeClasses[size],
            'animate-bounce'
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
};

DotSpinner.displayName = 'DotSpinner';

/**
 * PulseSpinner - Pulsing circle loading indicator
 * 
 * @example
 * <PulseSpinner size="lg" variant="primary" />
 */
export const PulseSpinner: React.FC < SpinnerProps > = ({ size = 'md', variant = 'primary', className }) => {
  const sizeClassesPulse = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };
  
  return (
    <div
      className={cn(
        'rounded-full bg-gray-200 dark:bg-gray-700',
        sizeClassesPulse[size],
        className
      )}
    >
      <div
        className={cn(
          'h-full w-full animate-ping rounded-full opacity-75',
          variant === 'primary' && 'bg-primary-500',
          variant === 'default' && 'bg-gray-500',
          variant === 'white' && 'bg-white',
          variant === 'gray' && 'bg-gray-600'
        )}
      />
    </div>
  );
};

PulseSpinner.displayName = 'PulseSpinner';

// ==================== Skeleton Spinner (for consistency) ====================

/**
 * SkeletonSpinner - Skeleton version of spinner for loading states
 */
export const SkeletonSpinner: React.FC < SpinnerProps > = ({ size = 'md', className }) => {
  const sizeClassesSkeleton = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };
  
  return (
    <div
      className={cn(
        'rounded-full bg-gray-200 dark:bg-gray-700',
        sizeClassesSkeleton[size],
        className
      )}
    />
  );
};

SkeletonSpinner.displayName = 'SkeletonSpinner';

// ==================== CSS Animations (need to add to globals.css) ====================
// The following animations are used but need to be defined in CSS:
// 
// @keyframes spin-slow {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
// .animate-spin-slow {
//   animation: spin-slow 2s linear infinite;
// }
// 
// @keyframes spin-fast {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
// .animate-spin-fast {
//   animation: spin-fast 0.5s linear infinite;
// }
// 
// @keyframes wave {
//   0% { transform: translateX(-100%); }
//   50% { transform: translateX(100%); }
//   100% { transform: translateX(100%); }
// }
// .animate-wave {
//   animation: wave 1.5s infinite;
// }
