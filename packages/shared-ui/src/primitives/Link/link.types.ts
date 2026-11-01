import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
  readonly external?: boolean;
  readonly underline?: 'always' | 'hover' | 'never';
}
