import React, { ReactNode } from 'react';
import { Header, HeaderProps } from './Header';
import { Footer, FooterProps } from './Footer';
import { Sidebar, SidebarItem } from './Sidebar';
import { Container } from './Container';

export interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  headerProps?: Partial<HeaderProps>;
  footerProps?: Partial<FooterProps>;
  className?: string;
  showFooter?: boolean;
  sidebarCollapsible?: boolean;
  sidebarDefaultCollapsed?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarItems,
  headerProps,
  footerProps,
  className = '',
  showFooter = true,
  sidebarCollapsible = true,
  sidebarDefaultCollapsed = false,
}) => {
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      <Header {...headerProps} />
      <div className="flex flex-1">
        <Sidebar
          items={sidebarItems}
          collapsible={sidebarCollapsible}
          defaultCollapsed={sidebarDefaultCollapsed}
        />
        <main className="flex-1 bg-gray-50 p-6">
          <Container>{children}</Container>
        </main>
      </div>
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
};
