'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type StackGap = 0 | 1 | 2 | 3 | 4 | 6 | 8;
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly direction?: 'row' | 'column';
  readonly gap?: StackGap;
  readonly align?: StackAlign;
  readonly justify?: StackJustify;
  readonly wrap?: boolean;
  readonly as?: 'div' | 'section' | 'article' | 'aside' | 'nav' | 'main' | 'header' | 'footer';
}

const gapClasses: Record<StackGap, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
};

const alignClasses: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    children,
    direction = 'column',
    gap = 4,
    align = 'stretch',
    justify = 'start',
    wrap,
    as: Tag = 'div',
    className,
    ...rest
  },
  ref
) {
  return (
    <Tag
      ref={ref as never}
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Stack.displayName = 'Stack';
