/**
 * BroadcastType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_BROADCAST_TYPE } from '@vubon/shared-constants/platform/notification';
import { InvalidBroadcastTypeError } from '../../errors/schedule.errors.js';

type BroadcastTypeValue =
  (typeof NOTIFICATION_BROADCAST_TYPE)[keyof typeof NOTIFICATION_BROADCAST_TYPE];
const ALLOWED = Object.values(NOTIFICATION_BROADCAST_TYPE) as readonly string[];

export class BroadcastTypeVO extends BaseTypeVO<BroadcastTypeValue> {
  private constructor(value: BroadcastTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): BroadcastTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidBroadcastTypeError(raw, ALLOWED);
    }
    return new BroadcastTypeVO(raw as BroadcastTypeValue);
  }

  static reconstitute(raw: string): BroadcastTypeVO {
    return new BroadcastTypeVO(raw as BroadcastTypeValue);
  }

  static allUsers(): BroadcastTypeVO { return new BroadcastTypeVO(NOTIFICATION_BROADCAST_TYPE.ALL_USERS); }
  static segment(): BroadcastTypeVO { return new BroadcastTypeVO(NOTIFICATION_BROADCAST_TYPE.SEGMENT); }
  static roleBased(): BroadcastTypeVO { return new BroadcastTypeVO(NOTIFICATION_BROADCAST_TYPE.ROLE_BASED); }
  static locationBased(): BroadcastTypeVO { return new BroadcastTypeVO(NOTIFICATION_BROADCAST_TYPE.LOCATION_BASED); }
  static behaviorBased(): BroadcastTypeVO { return new BroadcastTypeVO(NOTIFICATION_BROADCAST_TYPE.BEHAVIOR_BASED); }
  static customList(): BroadcastTypeVO { return new BroadcastTypeVO(NOTIFICATION_BROADCAST_TYPE.CUSTOM_LIST); }

  targetsAllUsers(): boolean {
    return this.value === NOTIFICATION_BROADCAST_TYPE.ALL_USERS;
  }

  requiresSegmentDefinition(): boolean {
    return !this.targetsAllUsers();
  }
}
