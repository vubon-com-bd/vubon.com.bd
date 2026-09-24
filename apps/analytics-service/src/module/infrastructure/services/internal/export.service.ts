import { Injectable } from '@nestjs/common';
import { ReportRendererService } from './report-renderer.service';

export interface ExportResult {
  readonly format: string;
  readonly mimeType: string;
  readonly filename: string;
  readonly content: string;
}

@Injectable()
export class ExportService {
  constructor(private readonly renderer: ReportRendererService) {}

  /**
   * Serialize rows to a target format.
   */
  serialize(
    rows: readonly Readonly<Record<string, unknown>>[],
    format: string,
    filename: string,
  ): ExportResult {
    const safeFormat = this.normalizeFormat(format);
    const content = this.render(rows, safeFormat);
    return {
      format: safeFormat,
      mimeType: this.mimeType(safeFormat),
      filename: `${filename}.${safeFormat}`,
      content,
    };
  }

  private normalizeFormat(format: string): string {
    const allowed = ['json', 'csv', 'html'];
    return allowed.includes(format.toLowerCase()) ? format.toLowerCase() : 'json';
  }

  private render(
    rows: readonly Readonly<Record<string, unknown>>[],
    format: string,
  ): string {
    switch (format) {
      case 'csv':
        return this.renderer.toCsv(rows);
      case 'html':
        return this.renderer.toHtml({ title: 'Export', rows });
      case 'json':
      default:
        return this.renderer.toJson({ title: 'Export', rows });
    }
  }

  private mimeType(format: string): string {
    const map: Record<string, string> = {
      json: 'application/json',
      csv: 'text/csv',
      html: 'text/html',
    };
    return map[format] ?? 'application/octet-stream';
  }
}
