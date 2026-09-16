'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Container } from '../components/layout/Container';
import { cn } from '../utils/cn';

export interface CheckoutLayoutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly summary?: ReactNode;
  readonly children: ReactNode;
  readonly title?: ReactNode;
  readonly backLink?: ReactNode;
}

export const CheckoutLayout = forwardRef<HTMLDivElement, CheckoutLayoutProps>(
  function CheckoutLayout(
    { summary, children, title, backLink, className, ...rest },
    ref,
  ) {
    return (
      <div ref={ref} className={cn('bg-slate-50 py-6', className)} {...rest}>
        <Container size="lg">
          {(backLink || title) && (
            <div className="mb-4 flex flex-col gap-2">
              {backLink}
              {title && (
                <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
              )}
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-4">{children}</div>
            {summary && (
              <aside
                aria-label="Order summary"
                className="h-max rounded-lg border border-slate-200 bg-white p-4 md:sticky md:top-6"
              >
                {summary}
              </aside>
            )}
          </div>
        </Container>
      </div>
    );
  },
);

CheckoutLayout.displayName = 'CheckoutLayout';
