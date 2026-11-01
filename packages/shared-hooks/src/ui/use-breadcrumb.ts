import { useMemo } from 'react';

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

/**
 * Generate a breadcrumb trail from a pathname.
 * The `labelMap` maps route segments to human labels.
 */
export function useBreadcrumb(
  pathname: string,
  labelMap: Record<string, string> = {}
): {
  readonly items: readonly BreadcrumbItem[];
} {
  const items = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const out: BreadcrumbItem[] = [];
    let acc = '';
    for (const part of parts) {
      acc += `/${part}`;
      out.push({
        label: labelMap[part] ?? part.charAt(0).toUpperCase() + part.slice(1),
        href: acc,
      });
    }
    return out;
  }, [pathname, labelMap]);

  return { items };
}
