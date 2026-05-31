/**
 * Stack Component - Flexbox layout wrapper
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/layout/Stack
 * 
 * RULES:
 * ✅ ONLY flexbox layout component - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface StackProps {
  /** Stack content */
  children: React.ReactNode;
  /** Flex direction */
  direction ? : 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Cross-axis alignment */
  align ? : 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Main-axis justification */
  justify ? : 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Gap between items */
  spacing ? : 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Whether to wrap items */
  wrap ? : boolean;
  /** Additional CSS classes */
  className ? : string;
  /** As element (polymorphic) */
  as ? : keyof JSX.IntrinsicElements;
  /** Whether to take full width */
  fullWidth ? : boolean;
  /** Whether to take full height */
  fullHeight ? : boolean;
  /** Inline flex (display: inline-flex) */
  inline ? : boolean;
}

// ==================== Direction Classes ====================

const directionClasses = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
};

// ==================== Alignment Classes ====================

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

// ==================== Justification Classes ====================

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// ==================== Spacing Classes ====================

const spacingClasses = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

// ==================== Component ====================

/**
 * Stack - Flexbox layout component for consistent spacing and alignment
 * 
 * @example
 * // Vertical stack (default)
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * @example
 * // Horizontal row with center alignment
 * <Stack direction="row" align="center" spacing="lg">
 *   <Logo />
 *   <Nav />
 *   <UserMenu />
 * </Stack>
 * 
 * @example
 * // Space between items
 * <Stack direction="row" justify="between" fullWidth>
 *   <div>Left</div>
 *   <div>Right</div>
 * </Stack>
 * 
 * @example
 * // Wrapping row for responsive product grid
 * <Stack direction="row" wrap spacing="md">
 *   {products.map(product => <ProductCard key={product.id} {...product} />)}
 * </Stack>
 * 
 * @example
 * // As navigation element
 * <Stack as="nav" direction="row" spacing="md" align="center">
 *   <Link href="/">Home</Link>
 *   <Link href="/products">Products</Link>
 * </Stack>
 */
export const Stack: React.FC < StackProps > = ({
  children,
  direction = 'column',
  align = 'stretch',
  justify = 'start',
  spacing = 'md',
  wrap = false,
  className,
  as: Component = 'div',
  fullWidth = false,
  fullHeight = false,
  inline = false,
}) => {
  return (
    <Component
      className={cn(
        // Display
        inline ? 'inline-flex' : 'flex',
        // Direction
        directionClasses[direction],
        // Alignment
        alignClasses[align],
        // Justification
        justifyClasses[justify],
        // Spacing
        spacingClasses[spacing],
        // Wrap
        wrap && 'flex-wrap',
        // Size
        fullWidth && 'w-full',
        fullHeight && 'h-full',
        className
      )}
    >
      {children}
    </Component>
  );
};

Stack.displayName = 'Stack';

// ==================== VStack ====================

export interface VStackProps extends Omit < StackProps, 'direction' > {}

/**
 * VStack - Vertical stack (alias for Stack with direction="column")
 * 
 * @example
 * <VStack spacing="lg" align="center">
 *   <Avatar />
 *   <Heading>John Doe</Heading>
 *   <Text>Software Engineer</Text>
 * </VStack>
 */
export const VStack: React.FC < VStackProps > = (props) => {
  return <Stack {...props} direction="column" />;
};

VStack.displayName = 'VStack';

// ==================== HStack ====================

export interface HStackProps extends Omit < StackProps, 'direction' > {}

/**
 * HStack - Horizontal stack (alias for Stack with direction="row")
 * 
 * @example
 * <HStack spacing="md" align="center" justify="between">
 *   <Logo />
 *   <ThemeToggle />
 * </HStack>
 */
export const HStack: React.FC < HStackProps > = (props) => {
  return <Stack {...props} direction="row" />;
};

HStack.displayName = 'HStack';

// ==================== Divider ====================

export interface DividerProps {
  /** Orientation of the divider */
  orientation ? : 'horizontal' | 'vertical';
  /** Spacing around the divider */
  spacing ? : 'none' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className ? : string;
}

const dividerSpacing = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
};

const dividerVerticalSpacing = {
  none: 'mx-0',
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-6',
};

/**
 * Divider - Visual separator for Stack components
 * 
 * @example
 * <VStack spacing="md">
 *   <div>Section 1</div>
 *   <Divider />
 *   <div>Section 2</div>
 * </VStack>
 */
export const Divider: React.FC < DividerProps > = ({
  orientation = 'horizontal',
  spacing = 'md',
  className,
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'h-auto w-px self-stretch bg-gray-200 dark:bg-gray-700',
          dividerVerticalSpacing[spacing],
          className
        )}
      />
    );
  }
  
  return (
    <hr
      className={cn(
        'border-t border-gray-200 dark:border-gray-700',
        dividerSpacing[spacing],
        className
      )}
    />
  );
};

Divider.displayName = 'Divider';
