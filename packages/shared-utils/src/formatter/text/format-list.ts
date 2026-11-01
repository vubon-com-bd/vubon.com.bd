/**
 * Format an array as a human-readable list.
 * Falls back to simple join if Intl.ListFormat is unavailable.
 */
export function formatList(
  items: readonly string[],
  locale = 'en',
  type: 'conjunction' | 'disjunction' = 'conjunction'
): string {
  if (items.length === 0) return '';

  const ListFormatCtor = (
    Intl as unknown as {
      ListFormat?: new (
        locale: string,
        opts: { type: string; style: string }
      ) => { format: (arr: readonly string[]) => string };
    }
  ).ListFormat;

  if (ListFormatCtor) {
    const formatter = new ListFormatCtor(locale, { type, style: 'long' });
    return formatter.format(items);
  }

  const sep = type === 'disjunction' ? ' or ' : ' and ';
  if (items.length === 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]}${sep}${items[1]}`;
  const last = items[items.length - 1];
  const rest = items.slice(0, -1).join(', ');
  return `${rest},${sep}${last}`;
}
