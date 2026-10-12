/**
 * VendorReportStatus Value Object — generation state
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = ['pending', 'generating', 'ready', 'failed', 'expired'] as const;
type ReportStatus = (typeof ALLOWED)[number];

export class VendorReportStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): VendorReportStatusVO {
    if (typeof raw !== 'string' || !(ALLOWED as readonly string[]).includes(raw)) {
      throw new ValidationError(`Invalid report status "${raw}". Allowed: ${ALLOWED.join(', ')}`, 'status');
    }
    return new VendorReportStatusVO(raw);
  }

  static pending(): VendorReportStatusVO { return new VendorReportStatusVO('pending'); }
  static generating(): VendorReportStatusVO { return new VendorReportStatusVO('generating'); }
  static ready(): VendorReportStatusVO { return new VendorReportStatusVO('ready'); }
  static failed(): VendorReportStatusVO { return new VendorReportStatusVO('failed'); }
  static expired(): VendorReportStatusVO { return new VendorReportStatusVO('expired'); }

  static reconstitute(raw: string): VendorReportStatusVO { return new VendorReportStatusVO(raw); }

  isPending(): boolean { return this.value === 'pending'; }
  isGenerating(): boolean { return this.value === 'generating'; }
  isReady(): boolean { return this.value === 'ready'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isExpired(): boolean { return this.value === 'expired'; }

  isFinal(): boolean { return ['ready', 'failed', 'expired'].includes(this.value); }

  canTransitionTo(target: string): boolean {
    const t: Record<string, readonly string[]> = {
      pending: ['generating', 'failed'],
      generating: ['ready', 'failed'],
      ready: ['expired'],
      failed: [],
      expired: [],
    };
    return (t[this.value] ?? []).includes(target);
  }
}
