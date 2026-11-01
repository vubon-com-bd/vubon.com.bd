'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Stack, type StackGap, type StackAlign, type StackJustify } from './Stack';

export interface VStackProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly gap?: StackGap;
  readonly align?: StackAlign;
  readonly justify?: StackJustify;
}

export const VStack = forwardRef<HTMLDivElement, VStackProps>(function VStack(
  { children, gap = 3, align = 'stretch', justify, ...rest },
  ref
) {
  return (
    <Stack
      ref={ref}
      direction="column"
      gap={gap}
      align={align}
      {...(justify !== undefined && { justify })}
      {...rest}
    >
      {children}
    </Stack>
  );
});

VStack.displayName = 'VStack';
