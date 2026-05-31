/**
 * Card Component - Container for content
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Card
 * 
 * RULES:
 * ✅ ONLY UI card container - NO business logic
 * ✅ NO API calls, data fetching, auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict with forwardRef
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card visual style */
  variant?: 'default' | 'bordered' | 'elevated' | 'outline' | 'glass';
  /** Padding size */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Border radius size */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether card is interactive (adds hover effects) */
  interactive?: boolean;
  /** As element (polymorphic) */
  as?: keyof JSX.IntrinsicElements;
}

// ==================== Styles ====================

const variantClasses = {
  default: 'bg-white dark:bg-gray-900',
  bordered: 'border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900',
  elevated: 'bg-white shadow-lg dark:bg-gray-900',
  outline: 'border-2 border-gray-200 bg-transparent dark:border-gray-700',
  glass: 'bg-white/80 backdrop-blur-sm dark:bg-gray-900/80',
};

const paddingClasses = {
  none: 'p-0',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const radiusClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-2xl',
};

const interactiveClasses = {
  true: 'cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]',
  false: '',
};

// ==================== Component ====================

/**
 * Card - Container component for grouping related content
 * 
 * @example
 * // Basic card
 * <Card>
 *   <CardHeader title="Card Title" />
 *   <CardContent>Card content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 * 
 * @example
 * // Interactive card with hover effect
 * <Card interactive variant="elevated" padding="lg" onClick={() => navigate('/product/1')}>
 *   <ProductImage src="/product.jpg" />
 *   <h3>Product Name</h3>
 * </Card>
 * 
 * @example
 * // Glass card for modern look
 * <Card variant="glass" radius="xl" padding="lg">
 *   <div>Glass morphism content</div>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      radius = 'lg',
      interactive = false,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'overflow-hidden',
          variantClasses[variant],
          paddingClasses[padding],
          radiusClasses[radius],
          interactive && interactiveClasses[interactive],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// ==================== Card Header ====================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title?: React.ReactNode;
  /** Card description/subtitle */
  description?: React.ReactNode;
  /** Action button or element to show on the right */
  action?: React.ReactNode;
  /** Whether to show divider below header */
  withDivider?: boolean;
}

/**
 * CardHeader - Header section of card with title and description
 * 
 * @example
 * <CardHeader
 *   title="Account Settings"
 *   description="Manage your account preferences"
 *   action={<Button size="sm">Edit</Button>}
 * />
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  action,
  withDivider = true,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-start justify-between',
        withDivider && 'border-b border-gray-200 pb-4 dark:border-gray-700',
        className
      )}
      {...props}
    >
      <div className="flex-1">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
        {children}
      </div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

// ==================== Card Content ====================

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether content should have no padding (inherits from Card padding) */
  noPadding?: boolean;
}

/**
 * CardContent - Main content area of card
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  noPadding = false,
  ...props
}) => {
  return (
    <div className={cn(!noPadding && 'py-4', className)} {...props}>
      {children}
    </div>
  );
};

CardContent.displayName = 'CardContent';

// ==================== Card Footer ====================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show divider above footer */
  withDivider?: boolean;
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'between';
}

const footerAlignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
};

/**
 * CardFooter - Footer section of card for actions
 * 
 * @example
 * <CardFooter withDivider align="right">
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save</Button>
 * </CardFooter>
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  withDivider = true,
  align = 'left',
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center',
        footerAlignClasses[align],
        withDivider && 'border-t border-gray-200 pt-4 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = 'CardFooter';

// ==================== Card Image ====================

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait';
}

const aspectRatioClasses = {
  auto: '',
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
};

/**
 * CardImage - Image component for card with aspect ratio
 */
export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className,
  aspectRatio = 'auto',
}) => {
  return (
    <div className={cn('overflow-hidden', aspectRatioClasses[aspectRatio])}>
      <img
        src={src}
        alt={alt}
        className={cn('h-full w-full object-cover', className)}
      />
    </div>
  );
};

CardImage.displayName = 'CardImage';

// ==================== Card Grid ====================

export interface CardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gridColsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

const gridGapClasses = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

/**
 * CardGrid - Responsive grid layout for cards
 * 
 * @example
 * <CardGrid cols={3} gap="md">
 *   {products.map(product => (
 *     <ProductCard key={product.id} {...product} />
 *   ))}
 * </CardGrid>
 */
export const CardGrid: React.FC<CardGridProps> = ({
  children,
  cols = 3,
  gap = 'md',
  className,
}) => {
  return (
    <div className={cn('grid', gridColsClasses[cols], gridGapClasses[gap], className)}>
      {children}
    </div>
  );
};

CardGrid.displayName = 'CardGrid';
