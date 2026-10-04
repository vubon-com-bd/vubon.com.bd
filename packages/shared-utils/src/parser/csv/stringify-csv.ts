/**
 * Convert rows to CSV text, quoting when needed
 * @module shared-utils/parser/csv
 */
export interface StringifyCsvOptions {
  readonly delimiter?: string;
  readonly quote?: string;
}

export function stringifyCsv(
  rows: readonly (readonly (string | number | boolean | null | undefined)[])[],
  options: StringifyCsvOptions = {}
): string {
  const delimiter = options.delimiter ?? ',';
  const quote = options.quote ?? '"';

  const escape = (value: unknown): string => {
    const str = value === null || value === undefined ? '' : String(value);
    if (
      str.includes(delimiter) ||
      str.includes(quote) ||
      str.includes('\n') ||
      str.includes('\r')
    ) {
      return `${quote}${str.split(quote).join(quote + quote)}${quote}`;
    }
    return str;
  };

  return rows.map((row) => row.map(escape).join(delimiter)).join('\n');
}
