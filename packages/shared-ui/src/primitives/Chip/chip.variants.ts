import { cva, type VariantProps } from 'class-variance-authority';

export const chipVariants = cva(
  'inline-flex items-center gap-1 rounded-full border transition-colors',
  {
    variants: {
      variant: {
        default: 'border-slate-300 bg-white text-slate-700',
        primary: 'border-blue-300 bg-blue-50 text-blue-700',
        success: 'border-green-300 bg-green-50 text-green-700',
        warning: 'border-amber-300 bg-amber-50 text-amber-700',
        danger: 'border-red-300 bg-red-50 text-red-700',
      },
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-7 px-2.5 text-sm',
        lg: 'h-8 px-3 text-base',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-slate-100',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
);

export type ChipVariants = VariantProps<typeof chipVariants>;
