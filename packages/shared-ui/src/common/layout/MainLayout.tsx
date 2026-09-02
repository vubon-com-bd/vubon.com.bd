import React, { ReactNode } from 'react';
import { Header, HeaderProps } from './Header';
import { Footer, FooterProps } from './Footer';
import { Container } from './Container';

export interface MainLayoutProps {
  children: ReactNode;
  headerProps?: Partial<HeaderProps>;
  footerProps?: Partial<FooterProps>;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  headerProps,
  footerProps,
  className = '',
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      {showHeader && <Header {...headerProps} />}
      <main className="flex-1 py-8">
        <Container>{children}</Container>
      </main>
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
};
