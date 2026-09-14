/**
 * Format an array into a human-readable list
 * @module shared-utils/formatter/text
 */
import { LOCALE } from '@vubon/shared-constants/common';

export function formatList(
  items: readonly string[],
  locale: string = LOCALE.EN_US,
  style: 'long' | 'short' | 'narrow' = 'long'
): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];

  try {
    const formatter = new Intl.ListFormat(locale, {
      style,
      type: 'conjunction',
    });
    return formatter.format(items as string[]);
  } catch {
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  }
}
