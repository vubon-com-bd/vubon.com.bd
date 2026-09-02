import React, { ReactNode } from 'react';

export interface HeaderProps {
  logo?: ReactNode;
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
  sticky?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  leftContent,
  centerContent,
  rightContent,
  className = '',
  sticky = true,
}) => {
  const stickyStyles = sticky ? 'sticky top-0 z-40' : '';

  return (
    <header
      className={`bg-white border-b border-gray-200 ${stickyStyles} ${className}`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {logo && <div className="flex-shrink-0">{logo}</div>}
          {leftContent && <div>{leftContent}</div>}
        </div>
        {centerContent && (
          <div className="hidden flex-1 items-center justify-center md:flex">
            {centerContent}
          </div>
        )}
        <div className="flex items-center gap-2">{rightContent}</div>
      </div>
    </header>
  );
};
