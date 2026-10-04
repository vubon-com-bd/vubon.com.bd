'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { SkipToContent } from '../a11y/SkipToContent';
import { cn } from '../utils/cn';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  readonly header?: ReactNode;
  readonly sidebar?: ReactNode;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
  readonly mainId?: string;
}

/**
 * Base application shell.
 * - Provides skip-to-content link
 * - Renders header/sidebar/main/footer slots
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { header, sidebar, footer, children, mainId = 'main-content', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex min-h-screen flex-col bg-slate-50 text-slate-900', className)}
      {...rest}
    >
      <SkipToContent targetId={mainId} />
      {header}
      <div className="flex flex-1">
        {sidebar}
        <main id={mainId} tabIndex={-1} className="flex flex-1 flex-col focus-visible:outline-none">
          {children}
        </main>
      </div>
      {footer}
    </div>
  );
});

AppShell.displayName = 'AppShell';
