/**
 * ReadStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_READ_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidReadStatusError } from '../../errors/delivery.errors.js';

const ALLOWED = Object.values(NOTIFICATION_READ_STATUS) as readonly string[];

export class ReadStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReadStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidReadStatusError(raw, ALLOWED);
    }
    return new ReadStatusVO(raw);
  }

  static reconstitute(raw: string): ReadStatusVO {
    return new ReadStatusVO(raw);
  }

  static unread(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.UNREAD); }
  static read(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.READ); }
  static archived(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.ARCHIVED); }
  static deleted(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.DELETED); }
  static starred(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.STARRED); }
  static snoozed(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.SNOOZED); }

  isUnread(): boolean { return this.value === NOTIFICATION_READ_STATUS.UNREAD; }
  isRead(): boolean { return this.value === NOTIFICATION_READ_STATUS.READ; }
  isArchived(): boolean { return this.value === NOTIFICATION_READ_STATUS.ARCHIVED; }
  isDeleted(): boolean { return this.value === NOTIFICATION_READ_STATUS.DELETED; }
  isStarred(): boolean { return this.value === NOTIFICATION_READ_STATUS.STARRED; }
  isSnoozed(): boolean { return this.value === NOTIFICATION_READ_STATUS.SNOOZED; }

  isVisibleInInbox(): boolean {
    return this.isUnread() || this.isRead() || this.isStarred();
  }
}
