/**
 * CourierStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 *
 * Lifecycle: pending → active ↔ inactive | suspended → terminated
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { COURIER_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidCourierStatusError } from '../../errors/courier.errors.js';

const ALLOWED = Object.values(COURIER_STATUS) as readonly string[];

export class CourierStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CourierStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidCourierStatusError(String(raw));
    }
    return new CourierStatusVO(raw);
  }

  static reconstitute(raw: string): CourierStatusVO { return new CourierStatusVO(raw); }

  static active(): CourierStatusVO { return new CourierStatusVO(COURIER_STATUS.ACTIVE); }
  static inactive(): CourierStatusVO { return new CourierStatusVO(COURIER_STATUS.INACTIVE); }
  static suspended(): CourierStatusVO { return new CourierStatusVO(COURIER_STATUS.SUSPENDED); }
  static pending(): CourierStatusVO { return new CourierStatusVO(COURIER_STATUS.PENDING); }
  static terminated(): CourierStatusVO { return new CourierStatusVO(COURIER_STATUS.TERMINATED); }

  isActive(): boolean { return this.value === COURIER_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === COURIER_STATUS.INACTIVE; }
  isSuspended(): boolean { return this.value === COURIER_STATUS.SUSPENDED; }
  isPending(): boolean { return this.value === COURIER_STATUS.PENDING; }
  isTerminated(): boolean { return this.value === COURIER_STATUS.TERMINATED; }

  isFinal(): boolean { return this.isTerminated(); }

  /** Courier can accept new shipments. */
  isOperational(): boolean { return this.isActive(); }

  /** Courier can be restored. */
  isRecoverable(): boolean { return this.isSuspended() || this.isInactive(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [COURIER_STATUS.PENDING]: [
        COURIER_STATUS.ACTIVE,
        COURIER_STATUS.SUSPENDED,
        COURIER_STATUS.TERMINATED,
      ],
      [COURIER_STATUS.ACTIVE]: [
        COURIER_STATUS.INACTIVE,
        COURIER_STATUS.SUSPENDED,
        COURIER_STATUS.TERMINATED,
      ],
      [COURIER_STATUS.INACTIVE]: [
        COURIER_STATUS.ACTIVE,
        COURIER_STATUS.SUSPENDED,
        COURIER_STATUS.TERMINATED,
      ],
      [COURIER_STATUS.SUSPENDED]: [
        COURIER_STATUS.ACTIVE,
        COURIER_STATUS.INACTIVE,
        COURIER_STATUS.TERMINATED,
      ],
      [COURIER_STATUS.TERMINATED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
