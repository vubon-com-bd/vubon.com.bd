/**
 * VendorSuspensionInfoVO — suspension state and appeal window
 * @module vendor-service/src/module/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SuspensionReasonVO } from '../primitives/suspension-reason.vo.js';
import { VENDOR_SUSPENSION } from '@vubon/shared-constants/business';

export interface VendorSuspensionInfoVOProps {
  readonly reason: SuspensionReasonVO;
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly durationDays: number;
  readonly appealDeadline?: string;
  readonly appealSubmittedAt?: string;
  readonly autoLiftOnResolution: boolean;
  readonly notes?: string;
}

export class VendorSuspensionInfoVO extends BaseVO<VendorSuspensionInfoVOProps> {
  private constructor(props: VendorSuspensionInfoVOProps) {
    super(props);
  }

  static create(props: VendorSuspensionInfoVOProps): VendorSuspensionInfoVO {
    if (!(props.reason instanceof SuspensionReasonVO)) {
      throw new ValidationError('Suspension requires SuspensionReasonVO', 'reason');
    }
    if (Number.isNaN(Date.parse(props.suspendedAt))) {
      throw new ValidationError('suspendedAt must be a valid ISO timestamp', 'suspendedAt');
    }
    if (!Number.isInteger(props.durationDays) || props.durationDays <= 0) {
      throw new ValidationError('Suspension duration must be a positive integer', 'durationDays');
    }
    if (props.durationDays > VENDOR_SUSPENSION.MAX_DURATION_DAYS) {
      throw new ValidationError(
        `Suspension duration cannot exceed ${VENDOR_SUSPENSION.MAX_DURATION_DAYS} days`,
        'durationDays',
      );
    }
    if (props.notes !== undefined && props.notes.length > 1000) {
      throw new ValidationError('Suspension notes cannot exceed 1000 chars', 'notes');
    }
    return new VendorSuspensionInfoVO(props);
  }

  static reconstitute(props: VendorSuspensionInfoVOProps): VendorSuspensionInfoVO {
    return new VendorSuspensionInfoVO(props);
  }

  get reason(): SuspensionReasonVO { return this.value.reason; }
  get durationDays(): number { return this.value.durationDays; }
  get suspendedAt(): string { return this.value.suspendedAt; }

  /** When should the suspension automatically end? */
  calculateLiftDate(): Date {
    return new Date(Date.parse(this.value.suspendedAt) + this.value.durationDays * 24 * 60 * 60 * 1000);
  }

  isExpired(at: Date = new Date()): boolean {
    return at.getTime() >= this.calculateLiftDate().getTime();
  }

  daysRemaining(at: Date = new Date()): number {
    const diff = this.calculateLiftDate().getTime() - at.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  canAppeal(at: Date = new Date()): boolean {
    if (this.value.appealSubmittedAt) return false;
    if (!this.value.appealDeadline) return false;
    return at.getTime() <= Date.parse(this.value.appealDeadline);
  }

  hasAppeal(): boolean {
    return this.value.appealSubmittedAt !== undefined;
  }

  /** Compute appeal deadline from suspension date. */
  static computeAppealDeadline(suspendedAt: string): string {
    const base = new Date(suspendedAt);
    const deadline = new Date(base.getTime() + VENDOR_SUSPENSION.APPEAL_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    return deadline.toISOString();
  }

  isSevere(): boolean {
    return this.value.reason.isSevere();
  }

  isIndefinite(): boolean {
    return this.value.durationDays >= VENDOR_SUSPENSION.MAX_DURATION_DAYS;
  }
}
