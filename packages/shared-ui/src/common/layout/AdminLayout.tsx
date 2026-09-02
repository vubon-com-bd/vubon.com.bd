import React, { ReactNode } from 'react';
import { Header, HeaderProps } from './Header';
import { Sidebar, SidebarItem } from './Sidebar';
import { Container } from './Container';

export interface AdminLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  headerProps?: Partial<HeaderProps>;
  className?: string;
  sidebarCollapsible?: boolean;
  sidebarDefaultCollapsed?: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  sidebarItems,
  headerProps,
  className = '',
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
    </div>
  );
};
