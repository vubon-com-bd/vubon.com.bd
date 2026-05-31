/**
 * Breadcrumb Component - Navigation trail
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Breadcrumb
 * 
 * RULES:
 * ✅ ONLY UI breadcrumb component - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict
 * ✅ Accessibility support (aria-label, aria-current)
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Bengali label (optional) */
  labelBn ? : string;
  /** Navigation URL */
  href ? : string;
  /** Icon element */
  icon ? : React.ReactNode;
  /** Whether this item is active */
  active ? : boolean;
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator (default: '/') */
  separator ? : React.ReactNode;
  /** Home/root item (will be prepended) */
  homeItem ? : BreadcrumbItem;
  /** Whether to show home item */
  showHome ? : boolean;
  /** Additional CSS classes */
  className ? : string;
  /** Current locale for label selection */
  locale ? : 'en' | 'bn';
}

// ==================== Default Home Item ====================

const DEFAULT_HOME_ITEM: BreadcrumbItem = {
  label: 'Home',
  labelBn: 'হোম',
  href: '/',
  icon: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
};

// ==================== Component ====================

/**
 * Breadcrumb - Navigation trail showing current page location
 * 
 * @example
 * // Basic breadcrumb
 * <Breadcrumb
 *   items={[
 *     { label: 'Products', href: '/products' },
 *     { label: 'Electronics', href: '/products/electronics' },
 *     { label: 'Smartphones', active: true }
 *   ]}
 * />
 * 
 * @example
 * // With icons and custom separator
 * <Breadcrumb
 *   items={[
 *     { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
 *     { label: 'Orders', active: true }
 *   ]}
 *   separator={<ChevronRightIcon className="h-4 w-4" />}
 *   showHome
 * />
 * 
 * @example
 * // Bengali locale
 * <Breadcrumb
 *   items={[
 *     { label: 'Products', labelBn: 'পণ্য', href: '/products' },
 *     { label: 'Smartphone', labelBn: 'স্মার্টফোন', active: true }
 *   ]}
 *   locale="bn"
 * />
 */
export const Breadcrumb: React.FC < BreadcrumbProps > = ({
  items,
  separator = '/',
  homeItem,
  showHome = false,
  className,
  locale = 'en',
}) => {
  const getLabel = (item: BreadcrumbItem): string => {
    if (locale === 'bn' && item.labelBn) {
      return item.labelBn;
    }
    return item.label;
  };
  
  const allItems = showHome ? [homeItem || DEFAULT_HOME_ITEM, ...items] : items;
  const isLastItem = (index: number) => index === allItems.length - 1;
  
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">
        {allItems.map((item, index) => {
          const isLast = isLastItem(index);
          const isActive = item.active || isLast;
          const label = getLabel(item);

          return (
            <li
              key={index}
              className={cn(
                'flex items-center text-sm',
                index !== 0 && 'ml-2'
              )}
            >
              {/* Separator */}
              {index !== 0 && (
                <span className="mr-2 text-gray-400 dark:text-gray-500">
                  {separator}
                </span>
              )}
              
              {/* Breadcrumb item */}
              {item.href && !isActive ? (
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center transition-colors hover:text-gray-700 dark:hover:text-gray-300',
                    'text-gray-500 dark:text-gray-400'
                  )}
                >
                  {item.icon && <span className="mr-1.5">{item.icon}</span>}
                  <span>{label}</span>
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center',
                    isActive
                      ? 'font-medium text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400',
                    !isActive && 'cursor-default'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && <span className="mr-1.5">{item.icon}</span>}
                  <span>{label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

// ==================== BreadcrumbItem Component ====================

export interface BreadcrumbItemProps {
  children: React.ReactNode;
  href ? : string;
  icon ? : React.ReactNode;
  isCurrent ? : boolean;
  className ? : string;
}

/**
 * Individual breadcrumb item component
 */
export const BreadcrumbItem: React.FC < BreadcrumbItemProps > = ({
  children,
  href,
  icon,
  isCurrent,
  className,
}) => {
  const content = (
    <span className={cn('flex items-center', className)}>
      {icon && <span className="mr-1.5">{icon}</span>}
      <span>{children}</span>
    </span>
  );
  
  if (href && !isCurrent) {
    return (
      <a href={href} className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        {content}
      </a>
    );
  }
  
  return (
    <span
      className={cn(
        'font-medium text-gray-900 dark:text-white',
        isCurrent && 'cursor-default',
        className
      )}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {content}
    </span>
  );
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

// ==================== BreadcrumbSeparator ====================

export interface BreadcrumbSeparatorProps {
  children ? : React.ReactNode;
  className ? : string;
}

/**
 * Custom breadcrumb separator component
 */
export const BreadcrumbSeparator: React.FC < BreadcrumbSeparatorProps > = ({
  children = '/',
  className,
}) => {
  return (
    <span className={cn('text-gray-400 dark:text-gray-500', className)}>
      {children}
    </span>
  );
};

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ==================== Compound Component ====================

export interface BreadcrumbCompoundProps {
  children: React.ReactNode;
  className ? : string;
}

/**
 * Compound breadcrumb component for more flexible usage
 * 
 * @example
 * <Breadcrumb.Root>
 *   <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
 *   <Breadcrumb.Separator />
 *   <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
 *   <Breadcrumb.Separator />
 *   <Breadcrumb.Item isCurrent>Electronics</Breadcrumb.Item>
 * </Breadcrumb.Root>
 */
export const BreadcrumbRoot: React.FC < BreadcrumbCompoundProps > = ({ children, className }) => {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">{children}</ol>
    </nav>
  );
};

BreadcrumbRoot.displayName = 'BreadcrumbRoot';

// Export compound component
export const CompoundBreadcrumb = {
  Root: BreadcrumbRoot,
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
};
