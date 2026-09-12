/**
 * CSV Parser — supports quoted fields, escaped quotes, embedded newlines.
 */

const detectDelimiter = (csv: string): string => {
  const firstLine = csv.split(/\r?\n/)[0] ?? '';
  const counts = {
    ',': (firstLine.match(/,/g) ?? []).length,
    ';': (firstLine.match(/;/g) ?? []).length,
    '\t': (firstLine.match(/\t/g) ?? []).length,
  };
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]![0];
};

/**
 * Parses a CSV string into a 2D array.
 * Handles quoted fields, escaped quotes, and embedded newlines.
 */
export const parseCSV = (csv: string, delimiter?: string): string[][] => {
  if (!csv) return [];
  const d = delimiter ?? detectDelimiter(csv);
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const next = csv[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') inQuotes = true;
      else if (char === d) {
        row.push(field);
        field = '';
      } else if (char === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (char === '\r') {
        // skip
      } else {
        field += char;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || r[0] !== '');
};

/**
 * Escapes a field for CSV output.
 */
const escapeCSVField = (value: unknown, delimiter: string): string => {
  const str = value == null ? '' : String(value);
  if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export const stringifyCSV = (data: unknown[][], delimiter: string = ','): string =>
  data.map((row) => row.map((f) => escapeCSVField(f, delimiter)).join(delimiter)).join('\n');
