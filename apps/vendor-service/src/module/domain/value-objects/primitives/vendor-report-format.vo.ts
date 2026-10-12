/**
 * VendorReportFormat Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_REPORT_FORMAT } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_REPORT_FORMAT) as readonly string[];

export class VendorReportFormatVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): VendorReportFormatVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid report format "${raw}"`, 'format');
    }
    return new VendorReportFormatVO(raw);
  }

  static reconstitute(raw: string): VendorReportFormatVO { return new VendorReportFormatVO(raw); }

  isStructured(): boolean {
    return [VENDOR_REPORT_FORMAT.CSV, VENDOR_REPORT_FORMAT.XLSX, VENDOR_REPORT_FORMAT.JSON].includes(this.value as never);
  }

  mimeType(): string {
    const map: Record<string, string> = {
      [VENDOR_REPORT_FORMAT.PDF]: 'application/pdf',
      [VENDOR_REPORT_FORMAT.CSV]: 'text/csv',
      [VENDOR_REPORT_FORMAT.XLSX]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      [VENDOR_REPORT_FORMAT.JSON]: 'application/json',
      [VENDOR_REPORT_FORMAT.HTML]: 'text/html',
    };
    return map[this.value] ?? 'application/octet-stream';
  }
}
