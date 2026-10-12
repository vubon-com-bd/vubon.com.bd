/**
 * Report Generator Service
 * @module analytics-service/domain/services
 *
 * Report data assembly from raw analytics।
 */
export interface ReportRow {
  readonly [key: string]: string | number | boolean | null;
}

export interface ReportData {
  readonly columns: readonly string[];
  readonly rows: readonly ReportRow[];
  readonly totals: Readonly<Record<string, number>>;
  readonly rowCount: number;
  readonly generatedAt: string;
}

export class ReportGeneratorService {
  /**
   * Build report data from rows + metric columns
   */
  build(params: {
    rows: readonly ReportRow[];
    metricColumns: readonly string[];
    dimensionColumns: readonly string[];
    now: string;
  }): ReportData {
    const columns = [...params.dimensionColumns, ...params.metricColumns];

    // Compute totals
    const totals: Record<string, number> = {};
    for (const col of params.metricColumns) {
      let sum = 0;
      for (const row of params.rows) {
        const v = row[col];
        if (typeof v === 'number' && Number.isFinite(v)) {
          sum += v;
        }
      }
      totals[col] = Math.round(sum * 100) / 100;
    }

    return {
      columns: Object.freeze(columns),
      rows: Object.freeze([...params.rows]),
      totals: Object.freeze(totals),
      rowCount: params.rows.length,
      generatedAt: params.now,
    };
  }

  /**
   * Convert report data to CSV string
   */
  toCsv(data: ReportData): string {
    const lines: string[] = [];

    // Header
    lines.push(data.columns.map(this.escapeCsv).join(','));

    // Rows
    for (const row of data.rows) {
      const cells = data.columns.map((c) => {
        const v = row[c];
        if (v === null || v === undefined) return '';
        return this.escapeCsv(String(v));
      });
      lines.push(cells.join(','));
    }

    // Totals row (optional)
    if (Object.keys(data.totals).length > 0) {
      const totalRow = data.columns.map((c) => {
        const t = data.totals[c];
        return t !== undefined ? String(t) : '';
      });
      lines.push(totalRow.join(','));
    }

    return lines.join('\n');
  }

  /**
   * Sanitize for JSON export
   */
  toJson(data: ReportData): string {
    return JSON.stringify(data, null, 2);
  }

  /**
   * Pagination slice
   */
  paginate(data: ReportData, page: number, pageSize: number): ReportData {
    if (page < 1) throw new Error('page must be >= 1');
    if (pageSize < 1) throw new Error('pageSize must be >= 1');

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const slice = data.rows.slice(start, end);

    return {
      columns: data.columns,
      rows: Object.freeze(slice),
      totals: data.totals,
      rowCount: slice.length,
      generatedAt: data.generatedAt,
    };
  }

  private escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
