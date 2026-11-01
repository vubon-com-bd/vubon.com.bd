'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AppShell } from './AppShell';
import { Sidebar } from '../components/navigation/Sidebar';
import { Navbar } from '../components/navigation/Navbar';
import { Container } from '../components/layout/Container';
import { cn } from '../utils/cn';

export interface DashboardLayoutProps extends HTMLAttributes<HTMLDivElement> {
  readonly navbarLeft?: ReactNode;
  readonly navbarRight?: ReactNode;
  readonly sidebar?: ReactNode;
  readonly sidebarOpen?: boolean;
  readonly onSidebarClose?: () => void;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
  readonly containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  function DashboardLayout(
    {
      navbarLeft,
      navbarRight,
      sidebar,
      sidebarOpen = true,
      onSidebarClose,
      children,
      footer,
      containerSize = 'xl',
      className,
      ...rest
    },
    ref
  ) {
    return (
      <AppShell
        ref={ref}
        className={cn('bg-slate-50', className)}
        header={<Navbar left={navbarLeft} right={navbarRight} sticky />}
        sidebar={
          sidebar ? (
            <Sidebar
              open={sidebarOpen}
              {...(onSidebarClose !== undefined && { onClose: onSidebarClose })}
            >
              {sidebar}
            </Sidebar>
          ) : null
        }
        footer={footer}
        {...rest}
      >
        <Container size={containerSize} className="py-6">
          {children}
        </Container>
      </AppShell>
    );
  }
);

DashboardLayout.displayName = 'DashboardLayout';
