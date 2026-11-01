/**
 * ZoneStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ZONE_STATUS } from '@vubon/shared-constants/logistics';

export type ZoneStatusValue =
  (typeof ZONE_STATUS)[keyof typeof ZONE_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(ZONE_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<ZoneStatusValue, readonly ZoneStatusValue[]>
> = {
  active: ['inactive', 'restricted', 'suspended'],
  inactive: ['active', 'archived'],
  restricted: ['active', 'suspended'],
  suspended: ['active', 'archived'],
  archived: [], // final
};

export class ZoneStatusVO extends BaseStatusVO<ZoneStatusValue> {
  private constructor(value: ZoneStatusValue) {
    super(value);
  }

  static create(raw: string): ZoneStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ZoneStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ZoneStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new ZoneStatusVO(normalized as ZoneStatusValue);
  }

  static reconstitute(raw: string): ZoneStatusVO {
    return new ZoneStatusVO(raw as ZoneStatusValue);
  }

  static active(): ZoneStatusVO {
    return new ZoneStatusVO(ZONE_STATUS.ACTIVE);
  }

  isActive(): boolean { return this.value === ZONE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === ZONE_STATUS.INACTIVE; }
  isRestricted(): boolean { return this.value === ZONE_STATUS.RESTRICTED; }
  isSuspended(): boolean { return this.value === ZONE_STATUS.SUSPENDED; }
  isArchived(): boolean { return this.value === ZONE_STATUS.ARCHIVED; }

  isFinal(): boolean { return this.isArchived(); }
  isUsable(): boolean { return this.isActive(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as ZoneStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
