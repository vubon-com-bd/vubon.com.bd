/**
 * cn Utility - Class name merger
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/utils/cn
 * 
 * RULES:
 * ✅ ONLY class name merging - NO business logic
 * ✅ NO API calls, NO side effects
 * ✅ Pure function
 * ✅ TypeScript strict
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes safely
 * Combines clsx and tailwind-merge for optimal class handling
 * 
 * @param inputs - Class names to merge (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * cn('px-2 py-1', 'bg-red-500', { 'hover:bg-red-600': true })
 * // Returns: "px-2 py-1 bg-red-500 hover:bg-red-600"
 * 
 * cn('text-center', 'text-left') 
 * // Returns: "text-left" (last class wins)
 * 
 * cn('p-4', 'p-6')
 * // Returns: "p-6" (tailwind-merge handles conflicts)
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Conditional class merger - useful for component variants
 * 
 * @param baseClasses - Base classes always applied
 * @param conditions - Conditional class object
 * @returns Merged class string
 * 
 * @example
 * cnConditional('btn', { 'btn-primary': isPrimary, 'btn-disabled': isDisabled })
 */
export const cnConditional = (
  baseClasses: string,
  conditions: Record < string, boolean >
): string => {
  return cn(baseClasses, conditions);
};

/**
 * Variant class merger - for component variants with default
 * 
 * @param variants - Variant record
 * @param defaultVariant - Default variant key
 * @param selectedVariant - Selected variant key
 * @returns Class string for selected variant
 * 
 * @example
 * const buttonVariants = {
 *   primary: 'bg-blue-500 text-white',
 *   secondary: 'bg-gray-500 text-white',
 *   danger: 'bg-red-500 text-white',
 * };
 * 
 * cnVariant(buttonVariants, 'primary', variant)
 */
export const cnVariant = <T extends string>(
  variants: Record<T, string>,
  defaultVariant: T,
  selectedVariant?: T
): string => {
  const variant = selectedVariant && variants[selectedVariant] 
    ? variants[selectedVariant] 
    : variants[defaultVariant];
  return variant || '';
};

/**
 * Size class merger - for component size variants
 * 
 * @param sizes - Size record
 * @param defaultSize - Default size key
 * @param selectedSize - Selected size key
 * @returns Class string for selected size
 * 
 * @example
 * const buttonSizes = {
 *   sm: 'px-2 py-1 text-sm',
 *   md: 'px-4 py-2 text-base',
 *   lg: 'px-6 py-3 text-lg',
 * };
 * 
 * cnSize(buttonSizes, 'md', size)
 */
export const cnSize = <T extends string>(
  sizes: Record<T, string>,
  defaultSize: T,
  selectedSize?: T
): string => {
  const size = selectedSize && sizes[selectedSize] 
    ? sizes[selectedSize] 
    : sizes[defaultSize];
  return size || '';
};

// ==================== Type Exports ====================

export type { ClassValue };
