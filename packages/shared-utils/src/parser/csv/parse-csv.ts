/**
 * Parse CSV text into array of row arrays (handles quoted fields + newlines)
 * @module shared-utils/parser/csv
 */
export interface ParseCsvOptions {
  readonly delimiter?: string;
  readonly quote?: string;
}

export function parseCsv(input: string, options: ParseCsvOptions = {}): string[][] {
  const delimiter = options.delimiter ?? ',';
  const quote = options.quote ?? '"';

  if (typeof input !== 'string') return [];
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === quote) {
        if (input[i + 1] === quote) {
          field += quote;
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }

    if (ch === quote) {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === delimiter) {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (ch === '\r') {
      i++;
      continue;
    }
    if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += ch;
    i++;
  }

  // Flush last field / row
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}
