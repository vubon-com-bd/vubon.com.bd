'use client';
import { forwardRef, type HTMLAttributes, type ReactNode, type CSSProperties } from 'react';
import { cn } from '../../utils/cn';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly direction?: 'row' | 'column';
  readonly align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  readonly justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  readonly wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  readonly inline?: boolean;
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    children,
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    wrap = 'nowrap',
    inline,
    className,
    style,
    ...rest
  },
  ref
) {
  const flexStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: direction,
    flexWrap: wrap,
    ...style,
  };

  return (
    <div
      ref={ref}
      style={flexStyle}
      className={cn(alignClasses[align], justifyClasses[justify], className)}
      {...rest}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';
