import React, { ReactNode } from 'react';

export interface FooterProps {
  children?: ReactNode;
  className?: string;
  copyright?: string;
  copyrightBangla?: string;
  links?: { label: string; href: string }[];
}

export const Footer: React.FC<FooterProps> = ({
  children,
  className = '',
  copyright,
  copyrightBangla,
  links = [],
}) => {
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="container-custom py-8">
        {children && <div className="mb-4">{children}</div>}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-600">
            {copyright && <span>{copyright}</span>}
            {copyrightBangla && (
              <span className="font-bangla ml-2">{copyrightBangla}</span>
            )}
          </div>
          {links.length > 0 && (
            <div className="flex gap-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
