/**
 * ReturnStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_RETURN_STATUS } from '@vubon/shared-constants/business/order';

export type ReturnStatusValue = (typeof ORDER_RETURN_STATUS)[keyof typeof ORDER_RETURN_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(ORDER_RETURN_STATUS);

const VALID_TRANSITIONS: Readonly<Record<ReturnStatusValue, readonly ReturnStatusValue[]>> = {
  requested: ['approved', 'rejected'],
  approved: ['pickup_scheduled'],
  rejected: [],
  pickup_scheduled: ['picked_up'],
  picked_up: ['received'],
  received: ['inspected'],
  inspected: ['refunded', 'replaced', 'closed'],
  refunded: ['closed'],
  replaced: ['closed'],
  closed: [],
} as Readonly<Record<ReturnStatusValue, readonly ReturnStatusValue[]>>;

export class ReturnStatusVO extends BaseStatusVO<ReturnStatusValue> {
  private constructor(value: ReturnStatusValue) {
    super(value);
  }

  static create(raw: string): ReturnStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReturnStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ReturnStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new ReturnStatusVO(normalized as ReturnStatusValue);
  }

  static reconstitute(raw: string): ReturnStatusVO {
    return new ReturnStatusVO(raw as ReturnStatusValue);
  }

  static requested(): ReturnStatusVO { return new ReturnStatusVO(ORDER_RETURN_STATUS.REQUESTED as ReturnStatusValue); }

  isRequested(): boolean { return this.value === ORDER_RETURN_STATUS.REQUESTED; }
  isApproved(): boolean { return this.value === ORDER_RETURN_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === ORDER_RETURN_STATUS.REJECTED; }
  isPickupScheduled(): boolean { return this.value === ORDER_RETURN_STATUS.PICKUP_SCHEDULED; }
  isPickedUp(): boolean { return this.value === ORDER_RETURN_STATUS.PICKED_UP; }
  isReceived(): boolean { return this.value === ORDER_RETURN_STATUS.RECEIVED; }
  isInspected(): boolean { return this.value === ORDER_RETURN_STATUS.INSPECTED; }
  isRefunded(): boolean { return this.value === ORDER_RETURN_STATUS.REFUNDED; }
  isReplaced(): boolean { return this.value === ORDER_RETURN_STATUS.REPLACED; }
  isClosed(): boolean { return this.value === ORDER_RETURN_STATUS.CLOSED; }

  isTerminal(): boolean {
    return this.isRejected() || this.isClosed();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as ReturnStatusValue);
  }
}
