import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva('inline-flex items-center gap-1 rounded-full font-medium', {
  variants: {
    variant: {
      default: 'bg-slate-100 text-slate-700',
      primary: 'bg-blue-100 text-blue-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-amber-100 text-amber-700',
      danger: 'bg-red-100 text-red-700',
      info: 'bg-sky-100 text-sky-700',
      outline: 'border border-slate-300 bg-transparent text-slate-700',
    },
    size: {
      sm: 'h-5 px-2 text-xs',
      md: 'h-6 px-2.5 text-sm',
      lg: 'h-7 px-3 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
