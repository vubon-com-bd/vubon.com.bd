/**
 * DispatchStatus Value Object — state machine
 * @module logistics-service/src/module/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { DISPATCH_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidDispatchStatusError } from '../../errors/dispatch.errors.js';

const ALLOWED = Object.values(DISPATCH_STATUS) as readonly string[];

export class DispatchStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DispatchStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDispatchStatusError(String(raw));
    }
    return new DispatchStatusVO(raw);
  }

  static reconstitute(raw: string): DispatchStatusVO { return new DispatchStatusVO(raw); }

  static pending(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.PENDING); }
  static assigned(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.ASSIGNED); }
  static dispatched(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.DISPATCHED); }
  static inTransit(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.IN_TRANSIT); }
  static delivered(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.DELIVERED); }
  static failed(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.FAILED); }
  static returned(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.RETURNED); }
  static cancelled(): DispatchStatusVO { return new DispatchStatusVO(DISPATCH_STATUS.CANCELLED); }

  isPending(): boolean { return this.value === DISPATCH_STATUS.PENDING; }
  isAssigned(): boolean { return this.value === DISPATCH_STATUS.ASSIGNED; }
  isDispatched(): boolean { return this.value === DISPATCH_STATUS.DISPATCHED; }
  isInTransit(): boolean { return this.value === DISPATCH_STATUS.IN_TRANSIT; }
  isDelivered(): boolean { return this.value === DISPATCH_STATUS.DELIVERED; }
  isFailed(): boolean { return this.value === DISPATCH_STATUS.FAILED; }
  isReturned(): boolean { return this.value === DISPATCH_STATUS.RETURNED; }
  isCancelled(): boolean { return this.value === DISPATCH_STATUS.CANCELLED; }

  isFinal(): boolean {
    return [
      DISPATCH_STATUS.DELIVERED,
      DISPATCH_STATUS.RETURNED,
      DISPATCH_STATUS.CANCELLED,
    ].includes(this.value as never);
  }

  /** Dispatch is en route. */
  isInFlight(): boolean {
    return [DISPATCH_STATUS.DISPATCHED, DISPATCH_STATUS.IN_TRANSIT].includes(this.value as never);
  }

  canBeAssigned(): boolean { return this.isPending(); }
  canBeStarted(): boolean { return this.isPending() || this.isAssigned(); }
  canBeCancelled(): boolean { return !this.isInFlight() && !this.isFinal(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [DISPATCH_STATUS.PENDING]: [
        DISPATCH_STATUS.ASSIGNED,
        DISPATCH_STATUS.DISPATCHED,
        DISPATCH_STATUS.CANCELLED,
      ],
      [DISPATCH_STATUS.ASSIGNED]: [
        DISPATCH_STATUS.DISPATCHED,
        DISPATCH_STATUS.CANCELLED,
      ],
      [DISPATCH_STATUS.DISPATCHED]: [
        DISPATCH_STATUS.IN_TRANSIT,
        DISPATCH_STATUS.DELIVERED,
        DISPATCH_STATUS.FAILED,
      ],
      [DISPATCH_STATUS.IN_TRANSIT]: [
        DISPATCH_STATUS.DELIVERED,
        DISPATCH_STATUS.FAILED,
        DISPATCH_STATUS.RETURNED,
      ],
      [DISPATCH_STATUS.DELIVERED]: [],
      [DISPATCH_STATUS.FAILED]: [
        DISPATCH_STATUS.PENDING,
        DISPATCH_STATUS.CANCELLED,
      ],
      [DISPATCH_STATUS.RETURNED]: [],
      [DISPATCH_STATUS.CANCELLED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
