/**
 * RefundStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * State machine:
 *   requested → approved → processing → completed
 *   requested → rejected
 *   processing → failed → (retryable to requested)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type RefundStatusValue =
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

const VALID_STATUSES: readonly string[] = [
  'requested',
  'approved',
  'rejected',
  'processing',
  'completed',
  'failed',
  'cancelled',
];

const VALID_TRANSITIONS: Readonly<Record<RefundStatusValue, readonly RefundStatusValue[]>> = {
  requested: ['approved', 'rejected', 'cancelled'],
  approved: ['processing', 'cancelled'],
  rejected: [],
  processing: ['completed', 'failed'],
  completed: [],
  failed: ['requested'],
  cancelled: [],
};

export class RefundStatusVO extends BaseStatusVO<RefundStatusValue> {
  private constructor(value: RefundStatusValue) {
    super(value);
  }

  static create(raw: string): RefundStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('RefundStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid RefundStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new RefundStatusVO(normalized as RefundStatusValue);
  }

  static requested(): RefundStatusVO { return new RefundStatusVO('requested'); }
  static approved(): RefundStatusVO { return new RefundStatusVO('approved'); }
  static processing(): RefundStatusVO { return new RefundStatusVO('processing'); }
  static completed(): RefundStatusVO { return new RefundStatusVO('completed'); }
  static failed(): RefundStatusVO { return new RefundStatusVO('failed'); }
  static rejected(): RefundStatusVO { return new RefundStatusVO('rejected'); }
  static cancelled(): RefundStatusVO { return new RefundStatusVO('cancelled'); }

  isRequested(): boolean { return this.value === 'requested'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isProcessing(): boolean { return this.value === 'processing'; }
  isCompleted(): boolean { return this.value === 'completed'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isCancelled(): boolean { return this.value === 'cancelled'; }

  isFinal(): boolean {
    return this.isCompleted() || this.isRejected() || this.isCancelled();
  }

  isRetryable(): boolean {
    return this.isFailed();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as RefundStatusValue);
  }
}
