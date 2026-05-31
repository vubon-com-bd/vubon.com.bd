/**
 * Container Component - Responsive layout container
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/layout/Container
 * 
 * RULES:
 * ✅ ONLY layout container - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Maximum width variant */
  size ? : 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Whether to add horizontal padding */
  padding ? : boolean;
  /** Whether container is centered */
  centered ? : boolean;
  /** Whether container has fluid width (100% width) */
  fluid ? : boolean;
  /** Background color variant */
  background ? : 'white' | 'gray' | 'transparent';
  /** Additional CSS classes */
  className ? : string;
  /** As element (polymorphic) */
  as ? : keyof JSX.IntrinsicElements;
}

// ==================== Size Classes ====================

const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  '2xl': 'max-w-[120rem]',
  full: 'max-w-full',
};

// ==================== Background Classes ====================

const backgroundClasses = {
  white: 'bg-white dark:bg-gray-900',
  gray: 'bg-gray-50 dark:bg-gray-950',
  transparent: 'bg-transparent',
};

// ==================== Component ====================

/**
 * Container - Responsive centered container with max-width
 * 
 * @example
 * // Basic usage
 * <Container size="lg" padding>
 *   <div>Page content</div>
 * </Container>
 * 
 * @example
 * // Fluid container (full width)
 * <Container fluid padding>
 *   <div>Full width content with padding</div>
 * </Container>
 * 
 * @example
 * // As different element
 * <Container as="section" size="md">
 *   <h1>Section Title</h1>
 * </Container>
 * 
 * @example
 * // With background
 * <Container background="gray" padding>
 *   <div>Gray background container</div>
 * </Container>
 */
export const Container: React.FC < ContainerProps > = ({
  children,
  size = 'lg',
  padding = true,
  centered = true,
  fluid = false,
  background = 'transparent',
  className,
  as: Component = 'div',
}) => {
  return (
    <Component
      className={cn(
        // Base styles
        'w-full',
        // Width
        fluid ? 'max-w-full' : sizeClasses[size],
        // Centering
        centered && 'mx-auto',
        // Padding
        padding && 'px-4 sm:px-6 lg:px-8',
        // Background
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </Component>
  );
};

Container.displayName = 'Container';
