/**
 * DeliveryAttemptStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Attempt is a terminal record — no transitions.
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { DELIVERY_ATTEMPT_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidDeliveryAttemptStatusError } from '../../errors/delivery.errors.js';

const ALLOWED = Object.values(DELIVERY_ATTEMPT_STATUS) as readonly string[];

export class DeliveryAttemptStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryAttemptStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDeliveryAttemptStatusError(String(raw));
    }
    return new DeliveryAttemptStatusVO(raw);
  }

  static reconstitute(raw: string): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(raw); }

  static success(): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(DELIVERY_ATTEMPT_STATUS.SUCCESS); }
  static failed(): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(DELIVERY_ATTEMPT_STATUS.FAILED); }
  static rescheduled(): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(DELIVERY_ATTEMPT_STATUS.RESCHEDULED); }
  static refused(): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(DELIVERY_ATTEMPT_STATUS.REFUSED); }
  static noOneAvailable(): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(DELIVERY_ATTEMPT_STATUS.NO_ONE_AVAILABLE); }
  static wrongAddress(): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(DELIVERY_ATTEMPT_STATUS.WRONG_ADDRESS); }
  static accessDenied(): DeliveryAttemptStatusVO { return new DeliveryAttemptStatusVO(DELIVERY_ATTEMPT_STATUS.ACCESS_DENIED); }

  isSuccess(): boolean { return this.value === DELIVERY_ATTEMPT_STATUS.SUCCESS; }
  isFailed(): boolean { return this.value === DELIVERY_ATTEMPT_STATUS.FAILED; }
  isRescheduled(): boolean { return this.value === DELIVERY_ATTEMPT_STATUS.RESCHEDULED; }
  isRefused(): boolean { return this.value === DELIVERY_ATTEMPT_STATUS.REFUSED; }
  isNoOneAvailable(): boolean { return this.value === DELIVERY_ATTEMPT_STATUS.NO_ONE_AVAILABLE; }
  isWrongAddress(): boolean { return this.value === DELIVERY_ATTEMPT_STATUS.WRONG_ADDRESS; }
  isAccessDenied(): boolean { return this.value === DELIVERY_ATTEMPT_STATUS.ACCESS_DENIED; }

  /** All attempts are terminal once recorded. */
  isFinal(): boolean { return true; }

  /** Whether the attempt should trigger retry. */
  shouldRetry(): boolean {
    return [
      DELIVERY_ATTEMPT_STATUS.FAILED,
      DELIVERY_ATTEMPT_STATUS.NO_ONE_AVAILABLE,
      DELIVERY_ATTEMPT_STATUS.RESCHEDULED,
    ].includes(this.value as never);
  }

  /** Whether wrong-address style errors need manual correction. */
  requiresAddressCorrection(): boolean {
    return this.isWrongAddress();
  }

  canTransitionTo(): boolean { return false; }
}
