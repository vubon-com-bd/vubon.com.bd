/**
 * Class Variance Authority — re-export.
 * Use for building component variants.
 *
 * @example
 *   const buttonVariants = cva('base', {
 *     variants: {
 *       variant: { primary: 'bg-blue-500', secondary: 'bg-gray-200' },
 *       size: { sm: 'h-8', md: 'h-10', lg: 'h-12' },
 *     },
 *     defaultVariants: { variant: 'primary', size: 'md' },
 *   });
 */
export { cva, type VariantProps } from 'class-variance-authority';
