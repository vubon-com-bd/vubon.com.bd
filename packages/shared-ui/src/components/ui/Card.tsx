/**
 * Card Component - Container for content
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * IMPROVEMENTS:
 * - Added proper type for polymorphic 'as' prop
 * - Fixed padding inheritance documentation between Card and CardContent
 * - Enhanced CardGrid responsive breakpoints for better Bangladesh market support
 * - Added 'elevated-hover' variant for better interactive feedback
 *
 * @module shared-ui/src/components/ui/Card
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export type CardVariant = 'default' | 'bordered' | 'elevated' | 'elevated-hover' | 'outline' | 'glass';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card visual style */
  variant?: CardVariant;
  /** Padding size (applies to the entire Card component) */
  padding?: CardPadding;
  /** Border radius size */
  radius?: CardRadius;
  /** Whether card is interactive (adds hover effects) */
  interactive?: boolean;
  /** As element (polymorphic) - supports 'div', 'article', 'section', 'label' */
  as?: 'div' | 'article' | 'section' | 'label';
}

// ==================== Styles ====================

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white dark:bg-gray-900',
  bordered: 'border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900',
  elevated: 'bg-white shadow-lg dark:bg-gray-900',
  'elevated-hover': 'bg-white shadow-sm transition-shadow hover:shadow-lg dark:bg-gray-900',
  outline: 'border-2 border-gray-200 bg-transparent dark:border-gray-700',
  glass: 'bg-white/80 backdrop-blur-sm dark:bg-gray-900/80',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const radiusClasses: Record<CardRadius, string> = {
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
 * @remarks
 * The `padding` prop applies padding to the entire Card.
 * For child components (CardHeader, CardContent, CardFooter), 
 * they will inherit the padding context. Use `noPadding` on CardContent
 * if you need content to bleed to the edges.
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
 * <Card interactive variant="elevated-hover" padding="lg" onClick={() => navigate('/product/1')}>
 *   <CardImage src="/product.jpg" alt="Product" />
 *   <CardContent>Product Name</CardContent>
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
  /** 
   * Removes internal padding from CardContent.
   * Use this when you need content (like images or full-width sections) 
   * to bleed to the edges of the Card. The Card's overall padding is 
   * controlled by the Card component's `padding` prop.
   */
  noPadding?: boolean;
}

/**
 * CardContent - Main content area of card
 * 
 * @note The Card component's `padding` prop adds padding around the entire card.
 * CardContent adds additional padding inside by default. Set `noPadding={true}`
 * when you want the content to touch the Card's edges.
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  noPadding = false,
  ...props
}) => {
  return (
    <div 
      className={cn(!noPadding && 'py-4', className)} 
      {...props}
    >
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

const footerAlignClasses: Record<NonNullable<CardFooterProps['align']>, string> = {
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
        loading="lazy"
      />
    </div>
  );
};

CardImage.displayName = 'CardImage';

// ==================== Card Grid ====================

export type CardGridCols = 1 | 2 | 3 | 4 | 5 | 6;
export type CardGridGap = 'sm' | 'md' | 'lg';

export interface CardGridProps {
  children: React.ReactNode;
  /** Number of columns (responsive: mobile defaults to 1, then breaks at sm, md, lg) */
  cols?: CardGridCols;
  /** Gap between cards */
  gap?: CardGridGap;
  className?: string;
}

const gridColsClasses: Record<CardGridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

const gridGapClasses: Record<CardGridGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

/**
 * CardGrid - Responsive grid layout for cards
 * Optimized for Bangladesh market with responsive breakpoints
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
