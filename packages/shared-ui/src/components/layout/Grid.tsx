/**
 * Grid Component - CSS Grid layout wrapper
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/layout/Grid
 * 
 * RULES:
 * ✅ ONLY layout grid component - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface GridProps {
  /** Grid content */
  children: React.ReactNode;
  /** Number of columns */
  cols ? : 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Gap between grid items */
  gap ? : 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to make responsive (mobile-first breakpoints) */
  responsive ? : boolean;
  /** Mobile columns (overrides responsive default) */
  colsMobile ? : 1 | 2;
  /** Tablet columns */
  colsTablet ? : 2 | 3 | 4;
  /** Desktop columns */
  colsDesktop ? : 3 | 4 | 5 | 6 | 12;
  /** Additional CSS classes */
  className ? : string;
  /** As element (polymorphic) */
  as ? : keyof JSX.IntrinsicElements;
}

export interface GridItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Column span (how many columns this item takes) */
  span ? : 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Mobile span */
  spanMobile ? : 1 | 2;
  /** Tablet span */
  spanTablet ? : 1 | 2 | 3 | 4;
  /** Additional CSS classes */
  className ? : string;
}

// ==================== Gap Classes ====================

const gapClasses = {
  none: 'gap-0',
  xs: 'gap-1 sm:gap-2',
  sm: 'gap-2 sm:gap-3',
  md: 'gap-4 sm:gap-6',
  lg: 'gap-6 sm:gap-8',
  xl: 'gap-8 sm:gap-10',
};

// ==================== Column Classes (Responsive) ====================

const getResponsiveColClasses = (
  cols: GridProps['cols'],
  colsMobile: GridProps['colsMobile'],
  colsTablet: GridProps['colsTablet'],
  colsDesktop: GridProps['colsDesktop']
): string => {
  const mobile = colsMobile || (cols && cols > 2 ? 2 : cols) || 1;
  const tablet = colsTablet || (cols && cols > 3 ? 3 : cols) || 2;
  const desktop = colsDesktop || cols || 3;
  
  return `grid-cols-${mobile} sm:grid-cols-${tablet} lg:grid-cols-${desktop}`;
};

// ==================== Span Classes ====================

const getSpanClasses = (span: number, spanMobile ? : number, spanTablet ? : number): string => {
  const mobile = spanMobile || (span > 2 ? 2 : span);
  const tablet = spanTablet || (span > 4 ? 4 : span);
  
  if (spanMobile || spanTablet) {
    return `col-span-${mobile} sm:col-span-${tablet} lg:col-span-${span}`;
  }
  
  // For responsive spans, use col-span-{span} on larger screens
  if (span > 2) {
    return `col-span-1 sm:col-span-2 lg:col-span-${span}`;
  }
  
  return `col-span-${span}`;
};

// ==================== Component ====================

/**
 * Grid - CSS Grid layout component for responsive layouts
 * 
 * @example
 * // Basic 3-column grid
 * <Grid cols={3} gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * 
 * @example
 * // Responsive grid (2 on mobile, 3 on tablet, 4 on desktop)
 * <Grid colsDesktop={4} gap="lg">
 *   <Card>Product 1</Card>
 *   <Card>Product 2</Card>
 *   <Card>Product 3</Card>
 *   <Card>Product 4</Card>
 * </Grid>
 * 
 * @example
 * // With custom responsive columns
 * <Grid colsMobile={1} colsTablet={2} colsDesktop={3} gap="md">
 *   {items.map(item => <ProductCard key={item.id} {...item} />)}
 * </Grid>
 * 
 * @example
 * // As section element
 * <Grid as="section" cols={2} gap="lg">
 *   <div>Left column</div>
 *   <div>Right column</div>
 * </Grid>
 */
export const Grid: React.FC < GridProps > = ({
  children,
  cols,
  gap = 'md',
  responsive = true,
  colsMobile,
  colsTablet,
  colsDesktop,
  className,
  as: Component = 'div',
}) => {
  const colClass = responsive && (colsMobile || colsTablet || colsDesktop) ?
    getResponsiveColClasses(cols, colsMobile, colsTablet, colsDesktop) :
    cols ?
    `grid-cols-${cols}` :
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  
  return (
    <Component
      className={cn(
        'grid',
        colClass,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </Component>
  );
};

Grid.displayName = 'Grid';

/**
 * GridItem - Individual grid item with column span control
 * 
 * @example
 * <Grid cols={12}>
 *   <GridItem span={4}>Sidebar</GridItem>
 *   <GridItem span={8}>Main Content</GridItem>
 * </Grid>
 * 
 * @example
 * // Responsive span (full on mobile, half on tablet, quarter on desktop)
 * <Grid colsDesktop={4}>
 *   <GridItem span={1}>Item</GridItem>
 * </Grid>
 */
export const GridItem: React.FC < GridItemProps > = ({ children, span, spanMobile, spanTablet, className }) => {
  const spanClass = span ?
    getSpanClasses(span, spanMobile, spanTablet) :
    'col-span-1';
  
  return (
    <div className={cn(spanClass, className)}>
      {children}
    </div>
  );
};

GridItem.displayName = 'GridItem';
