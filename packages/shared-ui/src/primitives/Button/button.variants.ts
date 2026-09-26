import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-slate-900',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
        secondary:
          'bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-400 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
        outline:
          'border border-slate-300 bg-transparent hover:bg-slate-100 focus-visible:ring-slate-400 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800',
        ghost:
          'bg-transparent hover:bg-slate-100 focus-visible:ring-slate-400 dark:text-slate-100 dark:hover:bg-slate-800',
        danger:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600',
        success:
          'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600',
        link: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
