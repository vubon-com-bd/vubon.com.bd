'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Stack, type StackGap, type StackAlign, type StackJustify } from './Stack';

export interface HStackProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly gap?: StackGap;
  readonly align?: StackAlign;
  readonly justify?: StackJustify;
  readonly wrap?: boolean;
}

export const HStack = forwardRef<HTMLDivElement, HStackProps>(function HStack(
  { children, gap = 3, align = 'center', justify, wrap, ...rest },
  ref,
) {
  return (
    <Stack
      ref={ref}
      direction="row"
      gap={gap}
      align={align}
      {...(justify !== undefined && { justify })}
      {...(wrap !== undefined && { wrap })}
      {...rest}
    >
      {children}
    </Stack>
  );
});

HStack.displayName = 'HStack';
