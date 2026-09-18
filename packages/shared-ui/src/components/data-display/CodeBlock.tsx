'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  readonly code: string;
  readonly language?: string;
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(function CodeBlock(
  { code, language, className, ...rest },
  ref
) {
  return (
    <pre
      ref={ref}
      className={cn(
        'overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100',
        className
      )}
      data-language={language}
      {...rest}
    >
      <code>{code}</code>
    </pre>
  );
});

CodeBlock.displayName = 'CodeBlock';
