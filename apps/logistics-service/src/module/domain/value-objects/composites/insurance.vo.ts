/**
 * Insurance Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { InsuranceIdVO } from '../primitives/insurance-id.vo.js';
import { InsuranceStatusVO } from '../primitives/insurance-status.vo.js';
import { InsuranceTypeVO } from '../primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '../primitives/insurance-coverage.vo.js';

export interface InsuranceVOProps {
  readonly id: InsuranceIdVO;
  readonly policyNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly status: InsuranceStatusVO;
  readonly type: InsuranceTypeVO;
  readonly coverages: InsuranceCoverageVO;
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
  readonly startsAt: string;
  readonly expiresAt: string;
  readonly isClaimed: boolean;
  readonly provider?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class InsuranceVO extends BaseVO<InsuranceVOProps> {
  private constructor(props: InsuranceVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: InsuranceVOProps): InsuranceVO {
    const vo = new InsuranceVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: InsuranceVOProps): InsuranceVO {
    return new InsuranceVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.policyNumber) {
      throw new ValidationError('Policy number required', 'policyNumber');
    }
    if (!v.currency || v.currency.length < 3) {
      throw new ValidationError('Currency must be at least 3 chars', 'currency');
    }
    if (v.declaredValue <= 0) {
      throw new ValidationError('Declared value must be positive', 'declaredValue');
    }
    if (v.premium < 0) {
      throw new ValidationError('Premium cannot be negative', 'premium');
    }
    const start = new Date(v.startsAt);
    const end = new Date(v.expiresAt);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new ValidationError('Invalid start/end dates', 'dates');
    }
    if (end <= start) {
      throw new ValidationError('expiresAt must be after startsAt', 'expiresAt');
    }
  }

  get id(): InsuranceIdVO { return this.value.id; }
  get policyNumber(): string { return this.value.policyNumber; }
  get shipmentId(): string | undefined { return this.value.shipmentId; }
  get orderId(): string | undefined { return this.value.orderId; }
  get userId(): string | undefined { return this.value.userId; }
  get status(): InsuranceStatusVO { return this.value.status; }
  get type(): InsuranceTypeVO { return this.value.type; }
  get coverages(): InsuranceCoverageVO { return this.value.coverages; }
  get declaredValue(): number { return this.value.declaredValue; }
  get premium(): number { return this.value.premium; }
  get currency(): string { return this.value.currency; }
  get startsAt(): string { return this.value.startsAt; }
  get expiresAt(): string { return this.value.expiresAt; }
  get isClaimed(): boolean { return this.value.isClaimed; }
  get provider(): string | undefined { return this.value.provider; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isExpired(): boolean { return this.status.isExpired(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isClaimable(): boolean { return this.status.isClaimable() && !this.isExpired(); }

  isExpiredByDate(ref: Date = new Date()): boolean {
    return new Date(this.expiresAt) < ref;
  }

  hasCoverage(coverage: string): boolean {
    return this.coverages.has(coverage);
  }

  get coverageCount(): number {
    return this.coverages.count;
  }

  get premiumPercentOfValue(): number {
    if (this.declaredValue === 0) return 0;
    return (this.premium / this.declaredValue) * 100;
  }
}
