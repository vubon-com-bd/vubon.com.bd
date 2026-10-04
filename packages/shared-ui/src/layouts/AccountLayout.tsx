'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Container } from '../components/layout/Container';
import { cn } from '../utils/cn';

export interface AccountLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly sidebar: ReactNode;
  readonly children: ReactNode;
}

export const AccountLayout = forwardRef<HTMLDivElement, AccountLayoutProps>(function AccountLayout(
  { title, sidebar, children, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('py-6', className)} {...rest}>
      <Container size="lg">
        {title && <h1 className="mb-6 text-xl font-semibold text-slate-900">{title}</h1>}
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <aside aria-label="Account navigation">{sidebar}</aside>
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
});

AccountLayout.displayName = 'AccountLayout';
