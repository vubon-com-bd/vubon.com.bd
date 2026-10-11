/**
 * BroadcastTarget Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_BROADCAST_TARGET } from '@vubon/shared-constants/platform/notification';
import { InvalidBroadcastTargetError } from '../../errors/schedule.errors.js';

type BroadcastTargetValue =
  (typeof NOTIFICATION_BROADCAST_TARGET)[keyof typeof NOTIFICATION_BROADCAST_TARGET];
const ALLOWED = Object.values(NOTIFICATION_BROADCAST_TARGET) as readonly string[];

export class BroadcastTargetVO extends BaseTypeVO<BroadcastTargetValue> {
  private constructor(value: BroadcastTargetValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): BroadcastTargetVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidBroadcastTargetError(raw, ALLOWED);
    }
    return new BroadcastTargetVO(raw as BroadcastTargetValue);
  }

  static reconstitute(raw: string): BroadcastTargetVO {
    return new BroadcastTargetVO(raw as BroadcastTargetValue);
  }

  static all(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.ALL); }
  static activeUsers(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.ACTIVE_USERS); }
  static inactiveUsers(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.INACTIVE_USERS); }
  static newUsers(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.NEW_USERS); }
  static premiumUsers(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.PREMIUM_USERS); }
  static vendors(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.VENDORS); }
  static customers(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.CUSTOMERS); }
  static admins(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.ADMINS); }
  static custom(): BroadcastTargetVO { return new BroadcastTargetVO(NOTIFICATION_BROADCAST_TARGET.CUSTOM); }

  isAll(): boolean { return this.value === NOTIFICATION_BROADCAST_TARGET.ALL; }
  isCustom(): boolean { return this.value === NOTIFICATION_BROADCAST_TARGET.CUSTOM; }
}
