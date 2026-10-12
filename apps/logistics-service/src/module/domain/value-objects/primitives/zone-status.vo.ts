/**
 * ZoneStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ZONE_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidZoneStatusError } from '../../errors/zone.errors.js';

const ALLOWED = Object.values(ZONE_STATUS) as readonly string[];

export class ZoneStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ZoneStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidZoneStatusError(String(raw));
    }
    return new ZoneStatusVO(raw);
  }

  static reconstitute(raw: string): ZoneStatusVO { return new ZoneStatusVO(raw); }

  static active(): ZoneStatusVO { return new ZoneStatusVO(ZONE_STATUS.ACTIVE); }
  static inactive(): ZoneStatusVO { return new ZoneStatusVO(ZONE_STATUS.INACTIVE); }
  static restricted(): ZoneStatusVO { return new ZoneStatusVO(ZONE_STATUS.RESTRICTED); }
  static suspended(): ZoneStatusVO { return new ZoneStatusVO(ZONE_STATUS.SUSPENDED); }
  static archived(): ZoneStatusVO { return new ZoneStatusVO(ZONE_STATUS.ARCHIVED); }

  isActive(): boolean { return this.value === ZONE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === ZONE_STATUS.INACTIVE; }
  isRestricted(): boolean { return this.value === ZONE_STATUS.RESTRICTED; }
  isSuspended(): boolean { return this.value === ZONE_STATUS.SUSPENDED; }
  isArchived(): boolean { return this.value === ZONE_STATUS.ARCHIVED; }

  isFinal(): boolean { return this.isArchived(); }

  /** Zone can accept new orders. */
  canAcceptOrders(): boolean { return this.isActive(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [ZONE_STATUS.ACTIVE]: [
        ZONE_STATUS.INACTIVE,
        ZONE_STATUS.RESTRICTED,
        ZONE_STATUS.SUSPENDED,
        ZONE_STATUS.ARCHIVED,
      ],
      [ZONE_STATUS.INACTIVE]: [
        ZONE_STATUS.ACTIVE,
        ZONE_STATUS.ARCHIVED,
      ],
      [ZONE_STATUS.RESTRICTED]: [
        ZONE_STATUS.ACTIVE,
        ZONE_STATUS.SUSPENDED,
        ZONE_STATUS.ARCHIVED,
      ],
      [ZONE_STATUS.SUSPENDED]: [
        ZONE_STATUS.ACTIVE,
        ZONE_STATUS.INACTIVE,
        ZONE_STATUS.ARCHIVED,
      ],
      [ZONE_STATUS.ARCHIVED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
