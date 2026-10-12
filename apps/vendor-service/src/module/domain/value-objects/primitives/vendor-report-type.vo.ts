/**
 * VendorReportType Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_REPORT_TYPE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_REPORT_TYPE) as readonly string[];

export class VendorReportTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): VendorReportTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid report type "${raw}"`, 'type');
    }
    return new VendorReportTypeVO(raw);
  }

  static reconstitute(raw: string): VendorReportTypeVO { return new VendorReportTypeVO(raw); }

  isFinancial(): boolean {
    return [VENDOR_REPORT_TYPE.SALES, VENDOR_REPORT_TYPE.REVENUE, VENDOR_REPORT_TYPE.PAYOUT, VENDOR_REPORT_TYPE.COMMISSION].includes(this.value as never);
  }

  isOperational(): boolean {
    return [VENDOR_REPORT_TYPE.ORDERS, VENDOR_REPORT_TYPE.PRODUCTS, VENDOR_REPORT_TYPE.INVENTORY, VENDOR_REPORT_TYPE.PERFORMANCE].includes(this.value as never);
  }
}
