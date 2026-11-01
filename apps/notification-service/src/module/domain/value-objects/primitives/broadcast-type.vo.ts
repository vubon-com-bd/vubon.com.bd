/**
 * BroadcastType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_BROADCAST_TYPE } from '@vubon/shared-constants/platform';
import { InvalidBroadcastTypeError } from '@domain/errors/broadcast.errors.js';

export type BroadcastTypeValue =
  (typeof NOTIFICATION_BROADCAST_TYPE)[keyof typeof NOTIFICATION_BROADCAST_TYPE];

const ALLOWED = Object.values(NOTIFICATION_BROADCAST_TYPE) as readonly string[];

export class BroadcastTypeVO extends BaseTypeVO<BroadcastTypeValue> {
  private constructor(value: BroadcastTypeValue) {
    super(value);
  }

  static create(raw: string): BroadcastTypeVO {
    if (typeof raw !== 'string') {
      throw new InvalidBroadcastTypeError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidBroadcastTypeError(normalized, ALLOWED);
    }
    return new BroadcastTypeVO(normalized as BroadcastTypeValue);
  }

  static reconstitute(raw: string): BroadcastTypeVO {
    return new BroadcastTypeVO(raw as BroadcastTypeValue);
  }

  isMass(): boolean {
    return this.value === NOTIFICATION_BROADCAST_TYPE.ALL_USERS;
  }

  isTargeted(): boolean {
    return !this.isMass();
  }

  requiresAudienceDefinition(): boolean {
    return (
      this.value === NOTIFICATION_BROADCAST_TYPE.SEGMENT ||
      this.value === NOTIFICATION_BROADCAST_TYPE.CUSTOM_LIST
    );
  }
}
