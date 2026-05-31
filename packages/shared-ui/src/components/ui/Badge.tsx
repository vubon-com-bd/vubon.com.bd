/**
 * Badge Component - Status and label indicator
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Badge
 * 
 * RULES:
 * ✅ ONLY UI badge component - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict with forwardRef
 * ✅ Class-variance-authority for variant management
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ==================== Styles ====================

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        outline: 'border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
      },
      size: {
        xs: 'text-xs px-2 py-0.5',
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
      },
      rounded: {
        full: 'rounded-full',
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      rounded: 'full',
    },
  }
);

// ==================== Types ====================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a colored dot before content */
  dot?: boolean;
  /** Custom dot color (overrides variant dot color) */
  dotColor?: string;
  /** Whether badge is removable (shows close button) */
  removable?: boolean;
  /** Callback when removable badge is closed */
  onRemove?: () => void;
  /** Icon to show before content */
  icon?: React.ReactNode;
  /** Animation on appearance */
  animated?: boolean;
}

// ==================== Dot Color Map ====================

const dotColorMap: Record<string, string> = {
  default: 'bg-gray-500',
  primary: 'bg-primary-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  outline: 'bg-gray-500',
  ghost: 'bg-gray-500',
};

// ==================== Component ====================

/**
 * Badge - Small status indicator or label
 * 
 * @example
 * // Basic badge
 * <Badge variant="success">Active</Badge>
 * 
 * @example
 * // Badge with dot
 * <Badge variant="warning" dot>Pending</Badge>
 * 
 * @example
 * // Removable badge
 * <Badge removable onRemove={() => console.log('removed')}>
 *   Filter: Active
 * </Badge>
 * 
 * @example
 * // With icon
 * <Badge variant="info" icon={<UserIcon />}>
 *   12 new users
 * </Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      dot,
      dotColor,
      removable,
      onRemove,
      icon,
      animated,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleRemove = () => {
      setIsVisible(false);
      onRemove?.();
    };

    if (!isVisible) {
      return null;
    }

    const finalDotColor = dotColor || (variant ? dotColorMap[variant] : dotColorMap.default);

    return (
      <span
        className={cn(
          badgeVariants({ variant, size, rounded, className }),
          animated && 'animate-in fade-in-0 zoom-in-95 duration-200',
          removable && 'pr-1'
        )}
        ref={ref}
        {...props}
      >
        {dot && (
          <span
            className={cn('mr-1.5 h-2 w-2 rounded-full', finalDotColor)}
            aria-hidden="true"
          />
        )}
        {icon && <span className="mr-1.5">{icon}</span>}
        <span>{children}</span>
        {removable && (
          <button
            type="button"
            onClick={handleRemove}
            className="ml-1.5 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current"
            aria-label="Remove"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ==================== BadgeGroup ====================

export interface BadgeGroupProps {
  children: React.ReactNode;
  /** Spacing between badges */
  spacing?: 'sm' | 'md' | 'lg';
  /** Alignment of badges */
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const groupSpacingClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

const groupAlignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/**
 * BadgeGroup - Container for multiple badges
 * 
 * @example
 * <BadgeGroup spacing="md">
 *   <Badge variant="success">Success</Badge>
 *   <Badge variant="warning">Warning</Badge>
 *   <Badge variant="error">Error</Badge>
 * </BadgeGroup>
 */
export const BadgeGroup: React.FC<BadgeGroupProps> = ({
  children,
  spacing = 'md',
  align = 'left',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-wrap',
        groupSpacingClasses[spacing],
        groupAlignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};

BadgeGroup.displayName = 'BadgeGroup';

// ==================== StatusBadge ====================

export interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'busy' | 'pending' | 'approved' | 'rejected';
  showDot?: boolean;
  size?: BadgeProps['size'];
  className?: string;
}

const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string; labelBn?: string }> = {
  online: { variant: 'success', label: 'Online' },
  offline: { variant: 'default', label: 'Offline' },
  away: { variant: 'warning', label: 'Away' },
  busy: { variant: 'error', label: 'Busy' },
  pending: { variant: 'warning', label: 'Pending', labelBn: 'পেন্ডিং' },
  approved: { variant: 'success', label: 'Approved', labelBn: 'অনুমোদিত' },
  rejected: { variant: 'error', label: 'Rejected', labelBn: 'বাতিল' },
};

/**
 * StatusBadge - Pre-configured badge for common statuses
 * 
 * @example
 * <StatusBadge status="online" />
 * <StatusBadge status="pending" />
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showDot = true,
  size = 'sm',
  className,
}) => {
  const config = statusConfig[status];
  
  if (!config) {
    return null;
  }
  
  return (
    <Badge
      variant={config.variant}
      size={size}
      dot={showDot}
      className={className}
    >
      {config.label}
    </Badge>
  );
};

StatusBadge.displayName = 'StatusBadge';
