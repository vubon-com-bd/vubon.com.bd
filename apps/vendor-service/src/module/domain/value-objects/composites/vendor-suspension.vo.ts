/**
 * VendorSuspensionVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor suspension record।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SUSPENSION } from '@vubon/shared-constants/business';

import { SuspensionIdVO } from '../primitives/suspension-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { SuspensionStatusVO } from '../primitives/suspension-status.vo.js';
import { SuspensionReasonVO } from '../primitives/suspension-reason.vo.js';

export interface VendorSuspensionVOProps {
  readonly id: SuspensionIdVO;
  readonly vendorId: VendorIdVO;
  readonly status: SuspensionStatusVO;
  readonly reason: SuspensionReasonVO;
  readonly description?: string;
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly durationDays?: number;
  readonly liftedAt?: string;
  readonly liftedBy?: string;
  readonly liftReason?: string;
  readonly appealDeadline?: string;
  readonly appealNotes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorSuspensionVO extends BaseVO<VendorSuspensionVOProps> {
  private constructor(props: VendorSuspensionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorSuspensionVOProps): VendorSuspensionVO {
    const vo = new VendorSuspensionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorSuspensionVOProps): VendorSuspensionVO {
    return new VendorSuspensionVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.description && v.description.length > 2000) {
      throw new ValidationError('description max 2000 chars', 'description');
    }

    if (v.durationDays !== undefined) {
      if (!Number.isInteger(v.durationDays) || v.durationDays <= 0) {
        throw new ValidationError('durationDays must be a positive integer', 'durationDays');
      }
      if (v.durationDays > VENDOR_SUSPENSION.MAX_DURATION_DAYS) {
        throw new ValidationError(
          `durationDays cannot exceed ${VENDOR_SUSPENSION.MAX_DURATION_DAYS}`,
          'durationDays',
        );
      }
    }

    if (v.status.isLifted() && !v.liftedAt) {
      throw new ValidationError('Lifted suspension must have liftedAt', 'liftedAt');
    }
    if (v.status.isLifted() && !v.liftedBy) {
      throw new ValidationError('Lifted suspension must have liftedBy', 'liftedBy');
    }
    if (!v.status.isLifted() && v.liftedAt) {
      throw new ValidationError('Non-lifted suspension cannot have liftedAt', 'liftedAt');
    }

    if (v.suspendedAt && v.liftedAt) {
      if (new Date(v.suspendedAt) > new Date(v.liftedAt)) {
        throw new ValidationError('suspendedAt must be before liftedAt', 'liftedAt');
      }
    }
  }

  // ─── Getters ───
  get id(): SuspensionIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get status(): SuspensionStatusVO { return this.value.status; }
  get reason(): SuspensionReasonVO { return this.value.reason; }
  get description(): string | undefined { return this.value.description; }
  get suspendedAt(): string { return this.value.suspendedAt; }
  get suspendedBy(): string { return this.value.suspendedBy; }
  get durationDays(): number | undefined { return this.value.durationDays; }
  get liftedAt(): string | undefined { return this.value.liftedAt; }
  get liftedBy(): string | undefined { return this.value.liftedBy; }
  get liftReason(): string | undefined { return this.value.liftReason; }
  get appealDeadline(): string | undefined { return this.value.appealDeadline; }
  get appealNotes(): string | undefined { return this.value.appealNotes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isActive(): boolean { return this.status.isActive(); }
  isLifted(): boolean { return this.status.isLifted(); }
  isExpired(): boolean { return this.status.isExpired(); }
  isUnderAppeal(): boolean { return this.status.isUnderAppeal(); }

  isCurrentlyInEffect(): boolean { return this.status.isCurrentlyInEffect(); }
  isFinal(): boolean { return this.status.isFinal(); }

  hasDuration(): boolean { return this.durationDays !== undefined; }
  hasDescription(): boolean { return this.description !== undefined; }
  hasAppealDeadline(): boolean { return this.appealDeadline !== undefined; }

  /** Severe reason (fraud, policy) */
  isSevere(): boolean {
    return this.reason.isSevere();
  }

  /** Auto-resolvable (non-payment, doc expired) */
  isAutoResolvable(): boolean {
    return this.reason.isAutoResolvable();
  }

  /** Expected lift date (based on durationDays) */
  get expectedLiftDate(): string | null {
    if (!this.hasDuration()) return null;
    const suspended = new Date(this.suspendedAt).getTime();
    const durationMs = (this.durationDays ?? 0) * 24 * 60 * 60 * 1000;
    return new Date(suspended + durationMs).toISOString();
  }

  /** Suspension has passed its expected duration */
  isPastExpectedLift(): boolean {
    const expected = this.expectedLiftDate;
    if (!expected) return false;
    return Date.now() > new Date(expected).getTime();
  }

  /** Days remaining in suspension */
  get daysRemaining(): number | null {
    const expected = this.expectedLiftDate;
    if (!expected) return null;
    const diff = new Date(expected).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  }

  /** Can be appealed right now */
  canAppeal(): boolean {
    if (!this.isCurrentlyInEffect()) return false;
    if (!this.appealDeadline) return true;
    return new Date() < new Date(this.appealDeadline);
  }
}
