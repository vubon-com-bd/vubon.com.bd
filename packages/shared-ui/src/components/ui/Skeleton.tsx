/**
 * Skeleton Component - Loading placeholder
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Skeleton
 * 
 * RULES:
 * ✅ ONLY UI skeleton loading component - NO business logic
 * ✅ NO API calls, data fetching
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface SkeletonProps {
  /** Skeleton shape variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar' | 'image';
  /** Custom width */
  width?: string | number;
  /** Custom height */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
}

// ==================== Styles ====================

const variantStyles = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-md',
  card: 'rounded-lg',
  avatar: 'rounded-full',
  image: 'rounded-md',
};

const defaultSizes = {
  text: 'h-4',
  circular: 'h-10 w-10',
  rectangular: 'h-32 w-full',
  card: 'h-48 w-full',
  avatar: 'h-10 w-10',
  image: 'h-48 w-full',
};

const animationStyles = {
  pulse: 'animate-pulse',
  wave: 'relative overflow-hidden after:absolute after:inset-0 after:-translate-x-full after:animate-[wave_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent',
  none: '',
};

// ==================== Component ====================

/**
 * Skeleton - Loading placeholder component
 * 
 * @example
 * // Basic text skeleton
 * <Skeleton variant="text" width="200px" />
 * 
 * @example
 * // Avatar skeleton
 * <Skeleton variant="avatar" />
 * 
 * @example
 * // Card skeleton
 * <Skeleton variant="card" />
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  animation = 'pulse',
}) => {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700',
        variantStyles[variant],
        animationStyles[animation],
        !width && !height && defaultSizes[variant],
        className
      )}
      style={style}
    />
  );
};

Skeleton.displayName = 'Skeleton';

// ==================== Skeleton Text ====================

export interface SkeletonTextProps {
  /** Number of text lines */
  lines?: number;
  /** Last line width (percentage) */
  lastLineWidth?: string;
  /** Additional CSS classes */
  className?: string;
  /** Spacing between lines */
  spacing?: 'sm' | 'md' | 'lg';
}

const lineSpacingClasses = {
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3',
};

/**
 * SkeletonText - Multiple text lines skeleton
 * 
 * @example
 * <SkeletonText lines={3} lastLineWidth="75%" />
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineWidth = '75%',
  className,
  spacing = 'md',
}) => {
  return (
    <div className={cn(lineSpacingClasses[spacing], className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? lastLineWidth : '100%'}
          animation="pulse"
        />
      ))}
    </div>
  );
};

SkeletonText.displayName = 'SkeletonText';

// ==================== Skeleton Avatar ====================

export interface SkeletonAvatarProps {
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

const avatarSizeClasses = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

/**
 * SkeletonAvatar - Avatar placeholder skeleton
 * 
 * @example
 * <SkeletonAvatar size="lg" />
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size = 'md', className }) => {
  return <Skeleton variant="avatar" className={cn(avatarSizeClasses[size], className)} />;
};

SkeletonAvatar.displayName = 'SkeletonAvatar';

// ==================== Skeleton Card ====================

export interface SkeletonCardProps {
  /** Whether to show avatar */
  withAvatar?: boolean;
  /** Number of text lines */
  textLines?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonCard - Card placeholder skeleton
 * 
 * @example
 * <SkeletonCard withAvatar textLines={3} />
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  withAvatar = true,
  textLines = 3,
  className,
}) => {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800', className)}>
      <div className="flex items-start space-x-3">
        {withAvatar && <SkeletonAvatar />}
        <div className="flex-1">
          <Skeleton width="60%" height="20px" className="mb-2" />
          <Skeleton width="40%" height="16px" />
        </div>
      </div>
      <div className="mt-4">
        <SkeletonText lines={textLines} spacing="sm" />
      </div>
      <div className="mt-4 flex justify-between">
        <Skeleton width="30%" height="32px" />
        <Skeleton width="30%" height="32px" />
      </div>
    </div>
  );
};

SkeletonCard.displayName = 'SkeletonCard';

// ==================== Skeleton Product Card ====================

export interface SkeletonProductCardProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonProductCard - E-commerce product card skeleton (Bangladesh specific)
 * 
 * @example
 * <SkeletonProductCard />
 */
export const SkeletonProductCard: React.FC<SkeletonProductCardProps> = ({ className }) => {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800', className)}>
      <Skeleton variant="image" height="200px" className="w-full" />
      <div className="mt-3 p-2">
        <Skeleton width="80%" height="16px" className="mb-2" />
        <Skeleton width="50%" height="14px" className="mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton width="40%" height="20px" />
          <Skeleton width="30%" height="32px" />
        </div>
      </div>
    </div>
  );
};

SkeletonProductCard.displayName = 'SkeletonProductCard';

// ==================== Skeleton Table ====================

export interface SkeletonTableProps {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonTable - Table loading skeleton
 * 
 * @example
 * <SkeletonTable rows={5} columns={4} />
 */
export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  className,
}) => {
  return (
    <div className={cn('w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700', className)}>
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`header-${i}`} width={`${90 / columns}%`} height="20px" />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex space-x-4 p-3">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton
                key={`cell-${rowIdx}-${colIdx}`}
                width={`${90 / columns}%`}
                height="16px"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

SkeletonTable.displayName = 'SkeletonTable';

// ==================== Skeleton Dashboard ====================

export interface SkeletonDashboardProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonDashboard - Dashboard layout skeleton
 * 
 * @example
 * <SkeletonDashboard />
 */
export const SkeletonDashboard: React.FC<SkeletonDashboardProps> = ({ className }) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`stat-${i}`} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <Skeleton width="60%" height="16px" className="mb-2" />
            <Skeleton width="40%" height="32px" />
          </div>
        ))}
      </div>
      
      {/* Charts and tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <Skeleton width="50%" height="20px" className="mb-4" />
          <Skeleton height="200px" className="w-full" />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <Skeleton width="50%" height="20px" className="mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`activity-${i}`} className="flex items-center justify-between">
                <Skeleton width="60%" height="14px" />
                <Skeleton width="20%" height="14px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

SkeletonDashboard.displayName = 'SkeletonDashboard';
