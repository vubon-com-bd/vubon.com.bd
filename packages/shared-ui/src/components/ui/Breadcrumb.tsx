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
 * ✅ Single pattern - only compound component pattern exported
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface BreadcrumbItemProps {
  /** Display label (English) */
  label: string;
  /** Bengali label (optional) */
  labelBn?: string;
  /** Navigation URL */
  href?: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** Whether this item is the current page */
  isCurrent?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export interface BreadcrumbRootProps {
  children: React.ReactNode;
  /** Custom separator (default: '/') */
  separator?: React.ReactNode;
  /** Current locale for label selection */
  locale?: 'en' | 'bn';
  /** Additional CSS classes */
  className?: string;
}

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  className?: string;
}

// ==================== Default Separator ====================

const DEFAULT_SEPARATOR = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// ==================== Sub-Components ====================

/**
 * Individual breadcrumb item component
 */
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  label,
  labelBn,
  href,
  icon,
  isCurrent = false,
  className,
  locale = 'en',
}) => {
  const displayLabel = locale === 'bn' && labelBn ? labelBn : label;

  const content = (
    <span className={cn('flex items-center gap-1.5', className)}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="text-sm">{displayLabel}</span>
    </span>
  );

  if (href && !isCurrent) {
    return (
      <a
        href={href}
        className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={cn(
        'font-medium text-gray-900 dark:text-white',
        isCurrent && 'cursor-default'
      )}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {content}
    </span>
  );
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * Breadcrumb separator component
 */
const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children = DEFAULT_SEPARATOR,
  className,
}) => {
  return (
    <span
      className={cn('mx-2 text-gray-400 dark:text-gray-500', className)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
};

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * Breadcrumb root container component (compound)
 */
const BreadcrumbRoot: React.FC<BreadcrumbRootProps> = ({
  children,
  separator = '/',
  locale = 'en',
  className,
}) => {
  // Process children to inject separators between items
  const childrenArray = React.Children.toArray(children);
  const processedChildren: React.ReactNode[] = [];

  childrenArray.forEach((child, index) => {
    // Add the child
    processedChildren.push(child);

    // Add separator if this is not the last child
    if (index < childrenArray.length - 1) {
      processedChildren.push(
        <BreadcrumbSeparator key={`sep-${index}`}>
          {typeof separator === 'string' ? separator : separator}
        </BreadcrumbSeparator>
      );
    }
  });

  // Clone children to pass locale prop to BreadcrumbItem components
  const enhancedChildren = React.Children.map(processedChildren, (child) => {
    if (React.isValidElement(child) && child.type === BreadcrumbItem) {
      return React.cloneElement(child, { locale });
    }
    return child;
  });

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">{enhancedChildren}</ol>
    </nav>
  );
};

BreadcrumbRoot.displayName = 'BreadcrumbRoot';

// ==================== Export Compound Component ====================

/**
 * Compound Breadcrumb component for flexible usage

 * @example
 * // Standard usage with items
 * <Breadcrumb.Root separator="/" locale="en">
 *   <Breadcrumb.Item label="Home" href="/" />
 *   <Breadcrumb.Item label="Products" href="/products" />
 *   <Breadcrumb.Item label="Electronics" isCurrent />
 * </Breadcrumb.Root>

 * @example
 * // With icons and Bengali labels
 * <Breadcrumb.Root separator="→" locale="bn">
 *   <Breadcrumb.Item label="হোম" href="/" icon={<HomeIcon />} />
 *   <Breadcrumb.Item label="পণ্য" href="/products" icon={<PackageIcon />} />
 *   <Breadcrumb.Item label="স্মার্টফোন" isCurrent />
 * </Breadcrumb.Root>
 */
export const Breadcrumb = {
  Root: BreadcrumbRoot,
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
};

// ==================== Helper Component: Simple Breadcrumb ====================

export interface SimpleBreadcrumbProps {
  /** Array of breadcrumb items */
  items: Array<{
    label: string;
    labelBn?: string;
    href?: string;
    icon?: React.ReactNode;
  }>;
  /** Current locale */
  locale?: 'en' | 'bn';
  /** Custom separator */
  separator?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Simple breadcrumb component for backward compatibility
 * Uses the compound component internally

 * @example
 * <SimpleBreadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Electronics' }
 *   ]}
 *   locale="en"
 * />
 */
export const SimpleBreadcrumb: React.FC<SimpleBreadcrumbProps> = ({
  items,
  locale = 'en',
  separator = '/',
  className,
}) => {
  return (
    <Breadcrumb.Root separator={separator} locale={locale} className={className}>
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          label={item.label}
          labelBn={item.labelBn}
          href={item.href}
          icon={item.icon}
          isCurrent={index === items.length - 1}
        />
      ))}
    </Breadcrumb.Root>
  );
};

SimpleBreadcrumb.displayName = 'SimpleBreadcrumb';

// ==================== Type Exports ====================

export type {
  BreadcrumbItemProps,
  BreadcrumbRootProps,
  BreadcrumbSeparatorProps,
  SimpleBreadcrumbProps,
};
