/**
 * ReturnStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_RETURN_STATUS } from '@vubon/shared-constants/business/order';
import { InvalidReturnStatusError } from '../../errors/order-return.errors.js';

const ALLOWED = Object.values(ORDER_RETURN_STATUS) as readonly string[];

export class ReturnStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReturnStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidReturnStatusError(raw, ALLOWED);
    }
    return new ReturnStatusVO(raw);
  }

  static requested(): ReturnStatusVO {
    return new ReturnStatusVO(ORDER_RETURN_STATUS.REQUESTED);
  }

  static reconstitute(raw: string): ReturnStatusVO {
    return new ReturnStatusVO(raw);
  }

  isRequested(): boolean { return this.value === ORDER_RETURN_STATUS.REQUESTED; }
  isApproved(): boolean { return this.value === ORDER_RETURN_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === ORDER_RETURN_STATUS.REJECTED; }
  isPickedUp(): boolean { return this.value === ORDER_RETURN_STATUS.PICKED_UP; }
  isReceived(): boolean { return this.value === ORDER_RETURN_STATUS.RECEIVED; }
  isRefunded(): boolean { return this.value === ORDER_RETURN_STATUS.REFUNDED; }
  isReplaced(): boolean { return this.value === ORDER_RETURN_STATUS.REPLACED; }
  isClosed(): boolean { return this.value === ORDER_RETURN_STATUS.CLOSED; }

  isFinal(): boolean {
    return [
      ORDER_RETURN_STATUS.REJECTED,
      ORDER_RETURN_STATUS.REFUNDED,
      ORDER_RETURN_STATUS.REPLACED,
      ORDER_RETURN_STATUS.CLOSED,
    ].includes(this.value as never);
  }

  canTransitionTo(target: string): boolean {
    const T = ORDER_RETURN_STATUS;
    const transitions: Record<string, readonly string[]> = {
      [T.REQUESTED]: [T.APPROVED, T.REJECTED],
      [T.APPROVED]: [T.PICKUP_SCHEDULED, T.PICKED_UP],
      [T.PICKUP_SCHEDULED]: [T.PICKED_UP],
      [T.PICKED_UP]: [T.RECEIVED],
      [T.RECEIVED]: [T.INSPECTED],
      [T.INSPECTED]: [T.REFUNDED, T.REPLACED, T.REJECTED],
      [T.REFUNDED]: [T.CLOSED],
      [T.REPLACED]: [T.CLOSED],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
