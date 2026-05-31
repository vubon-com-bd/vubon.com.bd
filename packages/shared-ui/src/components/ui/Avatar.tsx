/**
 * Avatar Component - User profile image with fallback
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/srcc/components/ui/Avatar
 * 
 * RULES:
 * ✅ ONLY UI avatar component - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support (alt text)
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface AvatarProps {
  /** Image source URL */
  src?: string | null;
  /** Alt text for image */
  alt?: string;
  /** User name (used for initials fallback) */
  name?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Shape variant */
  shape?: 'circle' | 'square' | 'rounded';
  /** Border */
  bordered?: boolean;
  /** Border color variant */
  borderColor?: 'primary' | 'success' | 'warning' | 'danger' | 'gray';
  /** Status indicator (online, offline, away) */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Additional CSS classes */
  className?: string;
  /** Custom fallback content (overrides initials) */
  fallback?: React.ReactNode;
  /** onClick handler */
  onClick?: () => void;
}

// ==================== Size Classes ====================

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl',
};

// ==================== Shape Classes ====================

const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
};

// ==================== Border Color Classes ====================

const borderColorClasses = {
  primary: 'ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  success: 'ring-2 ring-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  warning: 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  danger: 'ring-2 ring-red-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
  gray: 'ring-2 ring-gray-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
};

// ==================== Status Indicator Classes ====================

const statusSizeClasses = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4',
  '2xl': 'h-5 w-5',
};

const statusPositionClasses = {
  xs: '-right-0.5 -bottom-0.5',
  sm: '-right-0.5 -bottom-0.5',
  md: '-right-0.5 -bottom-0.5',
  lg: '-right-0.5 -bottom-0.5',
  xl: '-right-1 -bottom-1',
  '2xl': '-right-1 -bottom-1',
};

const statusColorClasses = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

// ==================== Helper Functions ====================

const getInitials = (name: string): string => {
  if (!name) return '?';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const getRandomColor = (name?: string): string => {
  if (!name) return 'bg-gray-200 text-gray-600';
  
  const colors = [
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
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// ==================== Component ====================

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
 * 
 * @example
 * // Clickable avatar
 * <Avatar name="Admin" onClick={() => navigate('/profile')} />
 * 
 * @example
 * // Different sizes
 * <Avatar name="XS" size="xs" />
 * <Avatar name="SM" size="sm" />
 * <Avatar name="MD" size="md" />
 * <Avatar name="LG" size="lg" />
 * <Avatar name="XL" size="xl" />
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
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
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const showImage = src && !imageError;
    const randomColor = getRandomColor(name);
    const avatarClasses = cn(
      'relative flex shrink-0 items-center justify-center overflow-hidden font-medium',
      sizeClasses[size],
      shapeClasses[shape],
      bordered && borderColorClasses[borderColor],
      onClick && 'cursor-pointer transition-opacity hover:opacity-80',
      !showImage && randomColor,
      className
    );

    const getFallbackContent = () => {
      if (fallback) return fallback;
      if (name) return getInitials(name);
      return (
        <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    };

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    const handleImageError = () => {
      setImageError(true);
      setIsLoading(false);
    };

    const wrapperProps = onClick ? { onClick, role: 'button', tabIndex: 0 } : {};

    return (
      <div ref={ref} className={avatarClasses} {...wrapperProps}>
        {/* Image */}
        {showImage && (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="h-1/3 w-1/3 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>
            )}
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
          <span className="flex items-center justify-center">{getFallbackContent()}</span>
        )}
        
        {/* Status indicator */}
        {status && (
          <span
            className={cn(
              'absolute rounded-full ring-2 ring-white dark:ring-gray-900',
              statusSizeClasses[size],
              statusPositionClasses[size],
              statusColorClasses[status]
            )}
            title={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ==================== AvatarGroup ====================

export interface AvatarGroupProps {
  children: React.ReactNode;
  /** Max avatars to show */
  max?: number;
  /** Size for all avatars */
  size?: AvatarProps['size'];
  /** Spacing between avatars */
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

const groupSpacingClasses = {
  sm: '-space-x-2',
  md: '-space-x-3',
  lg: '-space-x-4',
};

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
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  size = 'md',
  spacing = 'md',
  className,
}) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max && childrenArray.length > max ? childrenArray.length - max : 0;

  const enhancedChildren = React.Children.map(visibleChildren, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        size,
        className: cn(
          'ring-2 ring-white dark:ring-gray-900',
          child.props.className
        ),
      });
    }
    return child;
  });

  return (
    <div className={cn('flex', groupSpacingClasses[spacing], className)}>
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
};

AvatarGroup.displayName = 'AvatarGroup';
