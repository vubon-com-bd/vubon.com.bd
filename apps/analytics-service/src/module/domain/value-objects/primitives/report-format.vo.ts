/**
 * Report Format Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Report-এর export format (json, csv, xlsx, pdf, html)।
 * Business Rule:
 * - ANALYTICS_REPORT_FORMAT constants থেকে হতে হবে
 * - Format নির্ধারণ করে file size limit এবং rendering strategy
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_REPORT_FORMAT } from '@vubon/shared-constants/platform/analytics';

const VALID_FORMATS: readonly string[] = Object.values(ANALYTICS_REPORT_FORMAT);

export class ReportFormatVO extends BaseTypeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReportFormatVO {
    if (typeof raw !== 'string') {
      throw new Error('ReportFormat must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_FORMATS.includes(normalized)) {
      throw new Error(
        `Invalid ReportFormat: "${normalized}". Valid: ${VALID_FORMATS.join(', ')}`
      );
    }

    return new ReportFormatVO(normalized);
  }

  isJson(): boolean {
    return this.value === ANALYTICS_REPORT_FORMAT.JSON;
  }

  isCsv(): boolean {
    return this.value === ANALYTICS_REPORT_FORMAT.CSV;
  }

  isXlsx(): boolean {
    return this.value === ANALYTICS_REPORT_FORMAT.XLSX;
  }

  isPdf(): boolean {
    return this.value === ANALYTICS_REPORT_FORMAT.PDF;
  }

  isHtml(): boolean {
    return this.value === ANALYTICS_REPORT_FORMAT.HTML;
  }

  /** Structured data format (machine-readable) */
  isStructured(): boolean {
    return this.isJson() || this.isCsv() || this.isXlsx();
  }

  /** Document format (human-readable) */
  isDocument(): boolean {
    return this.isPdf() || this.isHtml();
  }

  /** Binary file কিনা */
  isBinary(): boolean {
    return this.isXlsx() || this.isPdf();
  }

  /** Browser-এ direct preview সম্ভব কিনা */
  isPreviewable(): boolean {
    return this.isJson() || this.isCsv() || this.isHtml();
  }

  /** Max recommended file size (bytes) */
  maxFileSizeBytes(): number {
    if (this.isCsv()) return 50 * 1024 * 1024; // 50 MB
    if (this.isXlsx()) return 100 * 1024 * 1024; // 100 MB
    if (this.isPdf()) return 30 * 1024 * 1024; // 30 MB
    if (this.isJson()) return 50 * 1024 * 1024; // 50 MB
    return 10 * 1024 * 1024; // HTML: 10 MB
  }

  /** MIME type */
  mimeType(): string {
    switch (this.value) {
      case ANALYTICS_REPORT_FORMAT.JSON:
        return 'application/json';
      case ANALYTICS_REPORT_FORMAT.CSV:
        return 'text/csv';
      case ANALYTICS_REPORT_FORMAT.XLSX:
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case ANALYTICS_REPORT_FORMAT.PDF:
        return 'application/pdf';
      case ANALYTICS_REPORT_FORMAT.HTML:
        return 'text/html';
      default:
        return 'application/octet-stream';
    }
  }

  /** File extension */
  fileExtension(): string {
    return this.value; // json, csv, xlsx, pdf, html
  }
}
