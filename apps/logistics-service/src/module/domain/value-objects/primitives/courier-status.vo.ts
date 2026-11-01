/**
 * CourierStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → active ⇄ inactive
 *   active/inactive → suspended
 *   suspended → active
 *   any → terminated ✓ (final)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COURIER_STATUS } from '@vubon/shared-constants/logistics';

export type CourierStatusValue =
  (typeof COURIER_STATUS)[keyof typeof COURIER_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(COURIER_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<CourierStatusValue, readonly CourierStatusValue[]>
> = {
  pending: ['active', 'inactive', 'terminated'],
  active: ['inactive', 'suspended', 'terminated'],
  inactive: ['active', 'terminated'],
  suspended: ['active', 'terminated'],
  terminated: [], // final
};

export class CourierStatusVO extends BaseStatusVO<CourierStatusValue> {
  private constructor(value: CourierStatusValue) {
    super(value);
  }

  static create(raw: string): CourierStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CourierStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CourierStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new CourierStatusVO(normalized as CourierStatusValue);
  }

  static reconstitute(raw: string): CourierStatusVO {
    return new CourierStatusVO(raw as CourierStatusValue);
  }

  static pending(): CourierStatusVO {
    return new CourierStatusVO(COURIER_STATUS.PENDING);
  }
  static active(): CourierStatusVO {
    return new CourierStatusVO(COURIER_STATUS.ACTIVE);
  }

  isPending(): boolean { return this.value === COURIER_STATUS.PENDING; }
  isActive(): boolean { return this.value === COURIER_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === COURIER_STATUS.INACTIVE; }
  isSuspended(): boolean { return this.value === COURIER_STATUS.SUSPENDED; }
  isTerminated(): boolean { return this.value === COURIER_STATUS.TERMINATED; }

  isFinal(): boolean { return this.isTerminated(); }
  isOperational(): boolean { return this.isActive(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as CourierStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
