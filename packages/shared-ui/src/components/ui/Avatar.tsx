/**
 * Avatar Component - User profile image with fallback
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-ui/src/components/ui/Avatar
 *
 * RULES:
 * ✅ ONLY UI avatar component - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component with proper TypeScript strictness
 * ✅ Accessibility support (alt text, role, tabIndex)
 */

import React, { memo, useCallback, useMemo, useState } from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'square' | 'rounded';
export type AvatarBorderColor = 'primary' | 'success' | 'warning' | 'danger' | 'gray';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  /** Image source URL */
  src?: string | null;
  /** Alt text for image */
  alt?: string;
  /** User name (used for initials fallback) */
  name?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Shape variant */
  shape?: AvatarShape;
  /** Border */
  bordered?: boolean;
  /** Border color variant */
  borderColor?: AvatarBorderColor;
  /** Status indicator (online, offline, away, busy) */
  status?: AvatarStatus;
  /** Additional CSS classes */
  className?: string;
  /** Custom fallback content (overrides initials) */
  fallback?: React.ReactNode;
  /** onClick handler */
  onClick?: () => void;
  /** Disable random color for consistent styling */
  disableRandomColor?: boolean;
}

export interface AvatarGroupProps {
  /** Avatar components */
  children: React.ReactNode;
  /** Max avatars to show */
  max?: number;
  /** Size for all avatars */
  size?: AvatarSize;
  /** Spacing between avatars */
  spacing?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

// ==================== Style Constants ====================

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl',
} as const;

const SHAPE_CLASSES: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
} as const;

const BORDER_COLOR_CLASSES: Record<AvatarBorderColor, string> = {
  primary: 'ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  success: 'ring-2 ring-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  warning: 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  danger: 'ring-2 ring-red-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  gray: 'ring-2 ring-gray-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
} as const;

const STATUS_SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4',
  '2xl': 'h-5 w-5',
} as const;

const STATUS_POSITION_CLASSES: Record<AvatarSize, string> = {
  xs: '-right-0.5 -bottom-0.5',
  sm: '-right-0.5 -bottom-0.5',
  md: '-right-0.5 -bottom-0.5',
  lg: '-right-0.5 -bottom-0.5',
  xl: '-right-1 -bottom-1',
  '2xl': '-right-1 -bottom-1',
} as const;

const STATUS_COLOR_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
} as const;

const GROUP_SPACING_CLASSES: Record<AvatarGroupProps['spacing'], string> = {
  sm: '-space-x-2',
  md: '-space-x-3',
  lg: '-space-x-4',
} as const;

// Avatar color palettes for fallback backgrounds
const AVATAR_COLORS = [
  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
] as const;

// ==================== Helper Functions ====================

/**
 * Get initials from user name
 * Pure function - deterministic output
 */
const getInitials = (name: string): string => {
  if (!name?.trim()) return '?';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Get deterministic color based on name (for consistent fallback)
 * Pure function - deterministic output based on input
 */
const getDeterministicColor = (name: string): string => {
  if (!name) return AVATAR_COLORS[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

// ==================== Sub-components ====================

/** Loading skeleton for avatar image */
const AvatarSkeleton: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="h-1/3 w-1/3 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700" />
  </div>
);

/** Default avatar icon for empty state */
const DefaultAvatarIcon: React.FC = () => (
  <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

// ==================== Main Avatar Component ====================

/**
 * Avatar - User profile image component with fallback initials
 *
 * @example
 * // Basic avatar with image
 * <Avatar src="/user-avatar.jpg" alt="John Doe" />
 *
 * @example
 * // Avatar with initials fallback
 * <Avatar name="John Doe" size="lg" />
 *
 * @example
 * // Avatar with status indicator
 * <Avatar name="Jane Smith" status="online" bordered borderColor="primary" />
 */
export const Avatar = memo(
  React.forwardRef<HTMLDivElement, AvatarProps>(
    (
      {
        src,
        alt,
        name,
        size = 'md',
        shape = 'circle',
        bordered = false,
        borderColor = 'primary',
        status,
        className,
        fallback,
        onClick,
        disableRandomColor = false,
      },
      ref
    ) => {
      const [imageError, setImageError] = useState(false);
      const [isLoading, setIsLoading] = useState(true);

      const showImage = !!src && !imageError;
      const backgroundColor = disableRandomColor
        ? AVATAR_COLORS[0]
        : getDeterministicColor(name || '');

      // Memoized class names for performance
      const avatarClasses = useMemo(
        () =>
          cn(
            'relative flex shrink-0 items-center justify-center overflow-hidden font-medium',
            SIZE_CLASSES[size],
            SHAPE_CLASSES[shape],
            bordered && BORDER_COLOR_CLASSES[borderColor],
            onClick && 'cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500',
            !showImage && backgroundColor,
            className
          ),
        [size, shape, bordered, borderColor, onClick, showImage, backgroundColor, className]
      );

      // Memoized fallback content
      const fallbackContent = useMemo(() => {
        if (fallback) return fallback;
        if (name) return getInitials(name);
        return <DefaultAvatarIcon />;
      }, [fallback, name]);

      // Memoized status indicator
      const statusIndicator = useMemo(() => {
        if (!status) return null;
        return (
          <span
            className={cn(
              'absolute rounded-full ring-2 ring-white dark:ring-gray-900',
              STATUS_SIZE_CLASSES[size],
              STATUS_POSITION_CLASSES[size],
              STATUS_COLOR_CLASSES[status]
            )}
            title={status}
            aria-label={`Status: ${status}`}
          />
        );
      }, [status, size]);

      // Event handlers
      const handleImageLoad = useCallback(() => {
        setIsLoading(false);
      }, []);

      const handleImageError = useCallback(() => {
        setImageError(true);
        setIsLoading(false);
      }, []);

      const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        },
        [onClick]
      );

      // Props for clickable avatar
      const clickableProps = onClick
        ? {
            onClick,
            onKeyDown: handleKeyDown,
            role: 'button',
            tabIndex: 0,
            'aria-label': alt || name || 'Avatar',
          }
        : {};

      return (
        <div ref={ref} className={avatarClasses} {...clickableProps}>
          {/* Image with loading state */}
          {showImage && (
            <>
              {isLoading && <AvatarSkeleton />}
              <img
                src={src}
                alt={alt || name || 'Avatar'}
                className="h-full w-full object-cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            </>
          )}

          {/* Fallback content */}
          {!showImage && (
            <span className="flex items-center justify-center">{fallbackContent}</span>
          )}

          {/* Status indicator */}
          {statusIndicator}
        </div>
      );
    }
  )
);

Avatar.displayName = 'Avatar';

// ==================== AvatarGroup Component ====================

/**
 * AvatarGroup - Group of avatars stacked with overlap
 *
 * @example
 * <AvatarGroup max={3} size="md">
 *   <Avatar name="John Doe" />
 *   <Avatar name="Jane Smith" />
 *   <Avatar name="Bob Johnson" />
 *   <Avatar name="Alice Brown" />
 * </AvatarGroup>
 */
export const AvatarGroup = memo(
  ({ children, max, size = 'md', spacing = 'md', className }: AvatarGroupProps) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max && childrenArray.length > max ? childrenArray.length - max : 0;

    // Type-safe cloning of children with proper props
    const enhancedChildren = useMemo(() => {
      return visibleChildren.map((child) => {
        if (React.isValidElement<AvatarProps>(child)) {
          return React.cloneElement(child, {
            size,
            className: cn('ring-2 ring-white dark:ring-gray-900', child.props.className),
          });
        }
        return child;
      });
    }, [visibleChildren, size]);

    return (
      <div className={cn('flex', GROUP_SPACING_CLASSES[spacing], className)}>
        {enhancedChildren}
        {remainingCount > 0 && (
          <Avatar
            name={`+${remainingCount}`}
            size={size}
            className="ring-2 ring-white dark:ring-gray-900"
          />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

// ==================== Type Exports ====================

export type {
  AvatarSize,
  AvatarShape,
  AvatarBorderColor,
  AvatarStatus,
  AvatarGroupProps,
  AvatarProps,
};
