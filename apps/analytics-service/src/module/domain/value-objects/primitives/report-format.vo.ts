import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_FORMATS = new Set<string>(['json', 'csv', 'xlsx', 'pdf', 'html']);

export class ReportFormatVO extends BaseTypeVO<string> {
  static create(raw: string): ReportFormatVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_FORMATS.has(normalized)) {
      throw new Error(`Invalid report format: ${raw}`);
    }
    return new ReportFormatVO(normalized);
  }

  static json(): ReportFormatVO {
    return new ReportFormatVO('json');
  }

  private constructor(value: string) {
    super(value);
  }

  get mimeType(): string {
    const map: Record<string, string> = {
      json: 'application/json',
      csv: 'text/csv',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pdf: 'application/pdf',
      html: 'text/html',
    };
    return map[this.value] ?? 'application/octet-stream';
  }

  get fileExtension(): string {
    return this.value;
  }
}
