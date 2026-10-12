/**
 * VendorReportPeriod Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_REPORT_PERIOD } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_REPORT_PERIOD) as readonly string[];

export class VendorReportPeriodVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): VendorReportPeriodVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid report period "${raw}"`, 'period');
    }
    return new VendorReportPeriodVO(raw);
  }

  static reconstitute(raw: string): VendorReportPeriodVO { return new VendorReportPeriodVO(raw); }

  isCustom(): boolean { return this.value === VENDOR_REPORT_PERIOD.CUSTOM; }

  /** Resolve to concrete [start, end] datetimes. */
  resolveRange(now: Date = new Date()): { start: Date; end: Date } {
    const end = new Date(now);
    const start = new Date(now);
    switch (this.value) {
      case VENDOR_REPORT_PERIOD.TODAY:
        start.setHours(0, 0, 0, 0);
        break;
      case VENDOR_REPORT_PERIOD.YESTERDAY:
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      case VENDOR_REPORT_PERIOD.LAST_7_DAYS:
        start.setDate(start.getDate() - 7);
        break;
      case VENDOR_REPORT_PERIOD.LAST_30_DAYS:
        start.setDate(start.getDate() - 30);
        break;
      case VENDOR_REPORT_PERIOD.THIS_MONTH:
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        break;
      case VENDOR_REPORT_PERIOD.LAST_MONTH:
        start.setMonth(start.getMonth() - 1, 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(0);
        end.setHours(23, 59, 59, 999);
        break;
      case VENDOR_REPORT_PERIOD.THIS_QUARTER: {
        const q = Math.floor(start.getMonth() / 3);
        start.setMonth(q * 3, 1);
        start.setHours(0, 0, 0, 0);
        break;
      }
      case VENDOR_REPORT_PERIOD.THIS_YEAR:
        start.setMonth(0, 1);
        start.setHours(0, 0, 0, 0);
        break;
      default:
        // CUSTOM — caller must supply
        break;
    }
    return { start, end };
  }
}
