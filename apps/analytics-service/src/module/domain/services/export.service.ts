import { ReportFormatVO } from '../value-objects/primitives/report-format.vo';

export interface ExportResult {
  readonly format: string;
  readonly mimeType: string;
  readonly filename: string;
  readonly content: string;
}

export class ExportService {
  /**
   * Serialize tabular data to a target format.
   */
  serialize(
    rows: readonly Readonly<Record<string, unknown>>[],
    format: string,
    filename: string,
  ): ExportResult {
    const formatVO = ReportFormatVO.create(format);
    const content = this.render(rows, formatVO.value);
    return {
      format: formatVO.value,
      mimeType: formatVO.mimeType,
      filename: `${filename}.${formatVO.fileExtension}`,
      content,
    };
  }

  private render(
    rows: readonly Readonly<Record<string, unknown>>[],
    format: string,
  ): string {
    if (format === 'json') return JSON.stringify(rows, null, 2);

    if (format === 'csv') {
      if (rows.length === 0) return '';
      const headers = Object.keys(rows[0]!);
      const lines = [headers.join(',')];
      for (const row of rows) {
        lines.push(
          headers
            .map((h) => {
              const v = row[h];
              const s = v === null || v === undefined ? '' : String(v);
              return s.includes(',') ? `"${s.replace(/"/g, '""')}"` : s;
            })
            .join(','),
        );
      }
      return lines.join('\n');
    }

    // default: json
    return JSON.stringify(rows, null, 2);
  }
}
