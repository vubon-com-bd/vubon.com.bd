/**
 * DriverStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 *
 * Lifecycle: available ↔ on_duty ↔ on_break ↔ off_duty
 *            any → on_leave | suspended | inactive
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { DRIVER_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidDriverStatusError } from '../../errors/driver.errors.js';

const ALLOWED = Object.values(DRIVER_STATUS) as readonly string[];

export class DriverStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DriverStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDriverStatusError(String(raw));
    }
    return new DriverStatusVO(raw);
  }

  static reconstitute(raw: string): DriverStatusVO { return new DriverStatusVO(raw); }

  static available(): DriverStatusVO { return new DriverStatusVO(DRIVER_STATUS.AVAILABLE); }
  static onDuty(): DriverStatusVO { return new DriverStatusVO(DRIVER_STATUS.ON_DUTY); }
  static onBreak(): DriverStatusVO { return new DriverStatusVO(DRIVER_STATUS.ON_BREAK); }
  static offDuty(): DriverStatusVO { return new DriverStatusVO(DRIVER_STATUS.OFF_DUTY); }
  static onLeave(): DriverStatusVO { return new DriverStatusVO(DRIVER_STATUS.ON_LEAVE); }
  static suspended(): DriverStatusVO { return new DriverStatusVO(DRIVER_STATUS.SUSPENDED); }
  static inactive(): DriverStatusVO { return new DriverStatusVO(DRIVER_STATUS.INACTIVE); }

  isAvailable(): boolean { return this.value === DRIVER_STATUS.AVAILABLE; }
  isOnDuty(): boolean { return this.value === DRIVER_STATUS.ON_DUTY; }
  isOnBreak(): boolean { return this.value === DRIVER_STATUS.ON_BREAK; }
  isOffDuty(): boolean { return this.value === DRIVER_STATUS.OFF_DUTY; }
  isOnLeave(): boolean { return this.value === DRIVER_STATUS.ON_LEAVE; }
  isSuspended(): boolean { return this.value === DRIVER_STATUS.SUSPENDED; }
  isInactive(): boolean { return this.value === DRIVER_STATUS.INACTIVE; }

  isFinal(): boolean { return this.isInactive(); }

  /** Driver can be assigned a delivery. */
  canBeAssigned(): boolean {
    return this.isAvailable() || this.isOnDuty();
  }

  /** Driver is currently working. */
  isWorking(): boolean {
    return this.isOnDuty() || this.isOnBreak() || this.isAvailable();
  }

  /** Driver is unavailable for new work. */
  isUnavailable(): boolean {
    return [DRIVER_STATUS.OFF_DUTY, DRIVER_STATUS.ON_LEAVE, DRIVER_STATUS.SUSPENDED, DRIVER_STATUS.INACTIVE].includes(
      this.value as never,
    );
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [DRIVER_STATUS.AVAILABLE]: [
        DRIVER_STATUS.ON_DUTY,
        DRIVER_STATUS.ON_BREAK,
        DRIVER_STATUS.OFF_DUTY,
        DRIVER_STATUS.ON_LEAVE,
        DRIVER_STATUS.SUSPENDED,
        DRIVER_STATUS.INACTIVE,
      ],
      [DRIVER_STATUS.ON_DUTY]: [
        DRIVER_STATUS.ON_BREAK,
        DRIVER_STATUS.AVAILABLE,
        DRIVER_STATUS.OFF_DUTY,
        DRIVER_STATUS.ON_LEAVE,
        DRIVER_STATUS.SUSPENDED,
      ],
      [DRIVER_STATUS.ON_BREAK]: [
        DRIVER_STATUS.ON_DUTY,
        DRIVER_STATUS.AVAILABLE,
        DRIVER_STATUS.OFF_DUTY,
      ],
      [DRIVER_STATUS.OFF_DUTY]: [
        DRIVER_STATUS.AVAILABLE,
        DRIVER_STATUS.ON_DUTY,
        DRIVER_STATUS.ON_LEAVE,
        DRIVER_STATUS.SUSPENDED,
        DRIVER_STATUS.INACTIVE,
      ],
      [DRIVER_STATUS.ON_LEAVE]: [
        DRIVER_STATUS.AVAILABLE,
        DRIVER_STATUS.OFF_DUTY,
        DRIVER_STATUS.SUSPENDED,
        DRIVER_STATUS.INACTIVE,
      ],
      [DRIVER_STATUS.SUSPENDED]: [
        DRIVER_STATUS.AVAILABLE,
        DRIVER_STATUS.OFF_DUTY,
        DRIVER_STATUS.INACTIVE,
      ],
      [DRIVER_STATUS.INACTIVE]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
