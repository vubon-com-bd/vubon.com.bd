/**
 * DriverStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DRIVER_STATUS } from '@vubon/shared-constants/logistics';

export type DriverStatusValue =
  (typeof DRIVER_STATUS)[keyof typeof DRIVER_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(DRIVER_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<DriverStatusValue, readonly DriverStatusValue[]>
> = {
  available: ['on_duty', 'on_break', 'off_duty', 'on_leave', 'suspended', 'inactive'],
  on_duty: ['available', 'on_break', 'off_duty'],
  on_break: ['on_duty', 'available', 'off_duty'],
  off_duty: ['available', 'on_leave', 'inactive'],
  on_leave: ['available', 'inactive'],
  suspended: ['available', 'inactive'],
  inactive: ['available', 'suspended'],
};

export class DriverStatusVO extends BaseStatusVO<DriverStatusValue> {
  private constructor(value: DriverStatusValue) {
    super(value);
  }

  static create(raw: string): DriverStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DriverStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DriverStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new DriverStatusVO(normalized as DriverStatusValue);
  }

  static reconstitute(raw: string): DriverStatusVO {
    return new DriverStatusVO(raw as DriverStatusValue);
  }

  static available(): DriverStatusVO {
    return new DriverStatusVO(DRIVER_STATUS.AVAILABLE);
  }

  isAvailable(): boolean { return this.value === DRIVER_STATUS.AVAILABLE; }
  isOnDuty(): boolean { return this.value === DRIVER_STATUS.ON_DUTY; }
  isOnBreak(): boolean { return this.value === DRIVER_STATUS.ON_BREAK; }
  isOffDuty(): boolean { return this.value === DRIVER_STATUS.OFF_DUTY; }
  isOnLeave(): boolean { return this.value === DRIVER_STATUS.ON_LEAVE; }
  isSuspended(): boolean { return this.value === DRIVER_STATUS.SUSPENDED; }
  isInactive(): boolean { return this.value === DRIVER_STATUS.INACTIVE; }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as DriverStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
