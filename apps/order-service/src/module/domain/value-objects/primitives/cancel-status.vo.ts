/**
 * CancelStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_CANCEL_STATUS } from '@vubon/shared-constants/business/order';
import { InvalidCancelStatusError } from '../../errors/order-cancel.errors.js';

const ALLOWED = Object.values(ORDER_CANCEL_STATUS) as readonly string[];

export class CancelStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CancelStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidCancelStatusError(raw, ALLOWED);
    }
    return new CancelStatusVO(raw);
  }

  static requested(): CancelStatusVO {
    return new CancelStatusVO(ORDER_CANCEL_STATUS.REQUESTED);
  }

  static reconstitute(raw: string): CancelStatusVO {
    return new CancelStatusVO(raw);
  }

  isRequested(): boolean { return this.value === ORDER_CANCEL_STATUS.REQUESTED; }
  isApproved(): boolean { return this.value === ORDER_CANCEL_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === ORDER_CANCEL_STATUS.REJECTED; }
  isProcessed(): boolean { return this.value === ORDER_CANCEL_STATUS.PROCESSED; }
  isRefunded(): boolean { return this.value === ORDER_CANCEL_STATUS.REFUNDED; }

  isFinal(): boolean {
    return [
      ORDER_CANCEL_STATUS.REJECTED,
      ORDER_CANCEL_STATUS.REFUNDED,
    ].includes(this.value as never);
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [ORDER_CANCEL_STATUS.REQUESTED]: [
        ORDER_CANCEL_STATUS.APPROVED,
        ORDER_CANCEL_STATUS.REJECTED,
      ],
      [ORDER_CANCEL_STATUS.APPROVED]: [
        ORDER_CANCEL_STATUS.PROCESSED,
      ],
      [ORDER_CANCEL_STATUS.PROCESSED]: [
        ORDER_CANCEL_STATUS.REFUNDED,
      ],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
