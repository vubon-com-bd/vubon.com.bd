/**
 * CancelStatus Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * State machine:
 *   requested → approved → processed → refunded
 *   requested → rejected
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_CANCEL_STATUS } from '@vubon/shared-constants/business/order';

export type CancelStatusValue = (typeof ORDER_CANCEL_STATUS)[keyof typeof ORDER_CANCEL_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(ORDER_CANCEL_STATUS);

const VALID_TRANSITIONS: Readonly<Record<CancelStatusValue, readonly CancelStatusValue[]>> = {
  requested: ['approved', 'rejected'],
  approved: ['processed'],
  processed: ['refunded'],
  refunded: [],
  rejected: [],
} as Readonly<Record<CancelStatusValue, readonly CancelStatusValue[]>>;

export class CancelStatusVO extends BaseStatusVO<CancelStatusValue> {
  private constructor(value: CancelStatusValue) {
    super(value);
  }

  static create(raw: string): CancelStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CancelStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CancelStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new CancelStatusVO(normalized as CancelStatusValue);
  }

  static reconstitute(raw: string): CancelStatusVO {
    return new CancelStatusVO(raw as CancelStatusValue);
  }

  static requested(): CancelStatusVO { return new CancelStatusVO(ORDER_CANCEL_STATUS.REQUESTED as CancelStatusValue); }
  static approved(): CancelStatusVO { return new CancelStatusVO(ORDER_CANCEL_STATUS.APPROVED as CancelStatusValue); }

  isRequested(): boolean { return this.value === ORDER_CANCEL_STATUS.REQUESTED; }
  isApproved(): boolean { return this.value === ORDER_CANCEL_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === ORDER_CANCEL_STATUS.REJECTED; }
  isProcessed(): boolean { return this.value === ORDER_CANCEL_STATUS.PROCESSED; }
  isRefunded(): boolean { return this.value === ORDER_CANCEL_STATUS.REFUNDED; }

  isTerminal(): boolean {
    return this.isRejected() || this.isRefunded();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as CancelStatusValue);
  }
}
