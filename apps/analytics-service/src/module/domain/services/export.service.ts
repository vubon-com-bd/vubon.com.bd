/**
 * Export Service
 * @module analytics-service/domain/services
 *
 * Analytics data export in multiple formats।
 */
export interface ExportOptions {
  readonly format: 'json' | 'csv' | 'tsv';
  readonly includeHeaders: boolean;
  readonly dateFormat?: 'iso' | 'unix' | 'human';
}

export interface ExportRow {
  readonly [key: string]: unknown;
}

/** Mutable internal row type (only used within this service) */
type MutableExportRow = Record<string, unknown>;

export interface ExportResult {
  readonly content: string;
  readonly contentType: string;
  readonly fileExtension: string;
  readonly sizeBytes: number;
  readonly rowCount: number;
}

export class ExportService {
  /**
   * Export data in requested format
   */
  export(
    rows: readonly ExportRow[],
    options: ExportOptions
  ): ExportResult {
    if (rows.length === 0) {
      return {
        content: '',
        contentType: this.contentType(options.format),
        fileExtension: options.format,
        sizeBytes: 0,
        rowCount: 0,
      };
    }

    const content = this.render(rows, options);
    const bytes = new TextEncoder().encode(content).length;

    return {
      content,
      contentType: this.contentType(options.format),
      fileExtension: options.format,
      sizeBytes: bytes,
      rowCount: rows.length,
    };
  }

  /**
   * Estimate export size (for validation)
   */
  estimateSize(rows: readonly ExportRow[], format: 'json' | 'csv' | 'tsv'): number {
    if (rows.length === 0) return 0;
    const sample = rows.slice(0, Math.min(100, rows.length));
    const sampleContent = this.render(sample, {
      format,
      includeHeaders: true,
    });
    const avgRowSize = new TextEncoder().encode(sampleContent).length / sample.length;
    return Math.round(avgRowSize * rows.length);
  }

  // ─── Private ────────────────────────────────

  private render(rows: readonly ExportRow[], options: ExportOptions): string {
    if (options.format === 'json') return this.renderJson(rows, options);
    return this.renderDelimited(rows, options);
  }

  private renderJson(rows: readonly ExportRow[], options: ExportOptions): string {
    const transformed = rows.map((row) => this.transformRow(row, options));
    return JSON.stringify(transformed, null, 2);
  }

  private renderDelimited(rows: readonly ExportRow[], options: ExportOptions): string {
    const delimiter = options.format === 'csv' ? ',' : '\t';
    const headers = Object.keys(rows[0]);
    const lines: string[] = [];

    if (options.includeHeaders) {
      lines.push(headers.map((h) => this.escapeDelimited(h, delimiter)).join(delimiter));
    }

    for (const row of rows) {
      const cells = headers.map((h) => {
        const v = this.transformValue(row[h], options);
        if (v === null || v === undefined) return '';
        return this.escapeDelimited(String(v), delimiter);
      });
      lines.push(cells.join(delimiter));
    }

    return lines.join('\n');
  }

  private transformRow(row: ExportRow, options: ExportOptions): ExportRow {
    const result: MutableExportRow = {};
    for (const [k, v] of Object.entries(row)) {
      result[k] = this.transformValue(v, options);
    }
    return result as ExportRow;
  }

  private transformValue(value: unknown, options: ExportOptions): unknown {
    if (value instanceof Date) {
      if (options.dateFormat === 'unix') return Math.floor(value.getTime() / 1000);
      if (options.dateFormat === 'human') return value.toISOString().split('T')[0];
      return value.toISOString();
    }
    return value;
  }

  private escapeDelimited(value: string, delimiter: string): string {
    if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private contentType(format: string): string {
    if (format === 'json') return 'application/json';
    if (format === 'csv') return 'text/csv';
    if (format === 'tsv') return 'text/tab-separated-values';
    return 'text/plain';
  }
}
