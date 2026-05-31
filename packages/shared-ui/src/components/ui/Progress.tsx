/**
 * Progress Component - Progress bar indicator
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Progress
 * 
 * RULES:
 * ✅ ONLY UI progress component - NO business logic
 * ✅ NO API calls, data fetching
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface ProgressProps {
  /** Current progress value */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Progress bar height */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
  /** Whether to show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside' | 'top';
  /** Whether to show animated stripes */
  striped?: boolean;
  /** Whether to animate (smooth transition) */
  animated?: boolean;
  /** Custom label renderer */
  labelRenderer?: (percentage: number) => React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Circle/radial progress mode */
  type?: 'linear' | 'circular';
  /** Size for circular progress (in pixels) */
  circularSize?: number;
  /** Stroke width for circular progress */
  strokeWidth?: number;
}

// ==================== Styles ====================

const sizeClasses = {
  xs: 'h-0.5',
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4',
};

const variantClasses = {
  default: 'bg-primary-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500',
};

// ==================== Linear Progress ====================

const LinearProgress: React.FC<Omit<ProgressProps, 'type'>> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  labelPosition = 'outside',
  striped = false,
  animated = true,
  labelRenderer,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const renderLabel = () => {
    if (!showLabel) return null;
    if (labelRenderer) return labelRenderer(percentage);
    return <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(percentage)}%</span>;
  };

  return (
    <div className={cn('w-full', className)}>
      {labelPosition === 'top' && showLabel && (
        <div className="mb-1 flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
          {renderLabel()}
        </div>
      )}
      {labelPosition === 'outside' && showLabel && labelPosition !== 'top' && (
        <div className="mb-1 flex justify-between">
          {renderLabel()}
        </div>
      )}
      <div
        className={cn(
          'overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center transition-all',
            variantClasses[variant],
            sizeClasses[size],
            striped && 'bg-stripes',
            animated && 'duration-300',
            striped && animated && 'animate-[progress-stripes_1s_linear_infinite]'
          )}
          style={{ width: `${percentage}%` }}
        >
          {labelPosition === 'inside' && showLabel && percentage > 15 && (
            <span className="text-xs font-medium text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
      {labelPosition === 'outside' && labelPosition !== 'top' && showLabel && (
        <div className="mt-1 flex justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {value} / {max}
          </span>
        </div>
      )}
    </div>
  );
};

// ==================== Circular Progress ====================

const CircularProgress: React.FC<Omit<ProgressProps, 'type'>> = ({
  value,
  max = 100,
  variant = 'default',
  showLabel = true,
  labelRenderer,
  className,
  circularSize = 80,
  strokeWidth = 8,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (circularSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const renderLabel = () => {
    if (!showLabel) return null;
    if (labelRenderer) return labelRenderer(percentage);
    return (
      <div className="text-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {Math.round(percentage)}%
        </span>
      </div>
    );
  };

  const variantColor = {
    default: '#3b82f6',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
    gradient: '#3b82f6',
  }[variant];

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        className="transform -rotate-90"
        width={circularSize}
        height={circularSize}
        viewBox={`0 0 ${circularSize} ${circularSize}`}
      >
        {/* Background circle */}
        <circle
          cx={circularSize / 2}
          cy={circularSize / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          className="dark:stroke-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={circularSize / 2}
          cy={circularSize / 2}
          r={radius}
          fill="none"
          stroke={variantColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {renderLabel()}
      </div>
    </div>
  );
};

// ==================== Main Component ====================

/**
 * Progress - Progress bar indicator
 * 
 * @example
 * // Basic linear progress
 * <Progress value={65} />
 * 
 * @example
 * // With label and custom variant
 * <Progress
 *   value={80}
 *   max={100}
 *   variant="success"
 *   showLabel
 *   size="lg"
 * />
 * 
 * @example
 * // Circular progress
 * <Progress
 *   type="circular"
 *   value={75}
 *   showLabel
 *   circularSize={100}
 *   strokeWidth={10}
 * />
 * 
 * @example
 * // Animated striped progress
 * <Progress
 *   value={50}
 *   striped
 *   animated
 *   variant="gradient"
 * />
 */
export const Progress: React.FC<ProgressProps> = (props) => {
  if (props.type === 'circular') {
    return <CircularProgress {...props} />;
  }
  return <LinearProgress {...props} />;
};

Progress.displayName = 'Progress';

// ==================== Progress Steps ====================

export interface ProgressStep {
  label: string;
  description?: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

export interface ProgressStepsProps {
  steps: ProgressStep[];
  currentStep?: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * ProgressSteps - Step-by-step progress indicator
 * 
 * @example
 * <ProgressSteps
 *   steps={[
 *     { label: 'Cart', status: 'completed' },
 *     { label: 'Checkout', status: 'active' },
 *     { label: 'Payment', status: 'pending' },
 *     { label: 'Confirmation', status: 'pending' },
 *   ]}
 * />
 */
export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  className,
  orientation = 'horizontal',
}) => {
  const stepsWithStatus = steps.map((step, index) => {
    if (currentStep !== undefined) {
      if (index < currentStep) return { ...step, status: 'completed' as const };
      if (index === currentStep) return { ...step, status: 'active' as const };
      return { ...step, status: 'pending' as const };
    }
    return step;
  });

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row justify-between' : 'flex-col gap-4'
        )}
      >
        {stepsWithStatus.map((step, index) => (
          <div
            key={index}
            className={cn(
              'flex',
              orientation === 'horizontal' ? 'flex-1' : 'flex-row gap-3'
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  step.status === 'completed' && 'bg-green-500 text-white',
                  step.status === 'active' && 'bg-primary-500 text-white',
                  step.status === 'error' && 'bg-red-500 text-white',
                  step.status === 'pending' && 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                )}
              >
                {step.status === 'completed' ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {orientation === 'horizontal' && index < steps.length - 1 && (
                <div
                  className={cn(
                    'mt-4 h-0.5 w-full',
                    step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  )}
                />
              )}
            </div>
            <div className={cn(orientation === 'vertical' && 'flex-1 pb-4')}>
              <p
                className={cn(
                  'text-sm font-medium',
                  step.status === 'active' && 'text-primary-600 dark:text-primary-400',
                  step.status === 'completed' && 'text-green-600 dark:text-green-400',
                  step.status === 'error' && 'text-red-600 dark:text-red-400',
                  step.status === 'pending' && 'text-gray-500 dark:text-gray-400'
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProgressSteps.displayName = 'ProgressSteps';
