'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AppShell } from './AppShell';
import { Navbar } from '../components/navigation/Navbar';
import { Container } from '../components/layout/Container';
import { cn } from '../utils/cn';

export interface CustomerLayoutProps extends HTMLAttributes<HTMLDivElement> {
  readonly navbarLeft?: ReactNode;
  readonly navbarCenter?: ReactNode;
  readonly navbarRight?: ReactNode;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
  readonly containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const CustomerLayout = forwardRef<HTMLDivElement, CustomerLayoutProps>(
  function CustomerLayout(
    {
      navbarLeft,
      navbarCenter,
      navbarRight,
      children,
      footer,
      containerSize = 'lg',
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <AppShell
        ref={ref}
        className={cn('bg-white', className)}
        header={
          <Navbar
            left={navbarLeft}
            center={navbarCenter}
            right={navbarRight}
            sticky
          />
        }
        footer={footer}
        {...rest}
      >
        <Container size={containerSize} className="py-6">
          {children}
        </Container>
      </AppShell>
    );
  },
);

CustomerLayout.displayName = 'CustomerLayout';
