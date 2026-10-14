/**
 * SettlementStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → processing → completed
 *   pending/processing → failed | cancelled | on_hold
 *   on_hold → processing | cancelled
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SETTLEMENT_STATUS } from '@vubon/shared-constants/business';

export type SettlementStatusValue =
  (typeof VENDOR_SETTLEMENT_STATUS)[keyof typeof VENDOR_SETTLEMENT_STATUS];

const VALID_STATUSES = new Set<string>(Object.values(VENDOR_SETTLEMENT_STATUS));

const VALID_TRANSITIONS: Readonly<
  Record<SettlementStatusValue, readonly SettlementStatusValue[]>
> = {
  pending: ['processing', 'failed', 'cancelled', 'on_hold'],
  processing: ['completed', 'failed', 'cancelled', 'on_hold'],
  completed: [],
  failed: ['pending', 'cancelled'],
  cancelled: [],
  on_hold: ['processing', 'cancelled', 'failed'],
};

export class SettlementStatusVO extends BaseStatusVO<SettlementStatusValue> {
  private constructor(value: SettlementStatusValue) {
    super(value);
  }

  static create(raw: string): SettlementStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SettlementStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new ValidationError(
        `Invalid SettlementStatus: "${normalized}". Allowed: ${[...VALID_STATUSES].join(', ')}`,
        'status',
      );
    }
    return new SettlementStatusVO(normalized as SettlementStatusValue);
  }

  static reconstitute(raw: string): SettlementStatusVO {
    return new SettlementStatusVO(raw as SettlementStatusValue);
  }

  static pending(): SettlementStatusVO { return new SettlementStatusVO('pending'); }
  static processing(): SettlementStatusVO { return new SettlementStatusVO('processing'); }
  static completed(): SettlementStatusVO { return new SettlementStatusVO('completed'); }
  static failed(): SettlementStatusVO { return new SettlementStatusVO('failed'); }
  static cancelled(): SettlementStatusVO { return new SettlementStatusVO('cancelled'); }
  static onHold(): SettlementStatusVO { return new SettlementStatusVO('on_hold'); }

  // ─── Predicates ───
  isPending(): boolean { return this.value === 'pending'; }
  isProcessing(): boolean { return this.value === 'processing'; }
  isCompleted(): boolean { return this.value === 'completed'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isCancelled(): boolean { return this.value === 'cancelled'; }
  isOnHold(): boolean { return this.value === 'on_hold'; }

  isFinal(): boolean {
    return this.isCompleted() || this.isCancelled();
  }

  isSuccessful(): boolean {
    return this.isCompleted();
  }

  isInProgress(): boolean {
    return this.isProcessing() || this.isOnHold();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as SettlementStatusValue);
  }
}
