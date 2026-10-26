/**
 * ReadStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_READ_STATUS } from '@vubon/shared-constants/platform';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ReadStatusValue =
  (typeof NOTIFICATION_READ_STATUS)[keyof typeof NOTIFICATION_READ_STATUS];

const ALLOWED = Object.values(NOTIFICATION_READ_STATUS) as readonly string[];

export class ReadStatusVO extends BaseStatusVO<ReadStatusValue> {
  private constructor(value: ReadStatusValue) {
    super(value);
  }

  static create(raw: string): ReadStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError(`Invalid read status "${String(raw)}"`, 'readStatus');
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new ValidationError(
        `Invalid read status "${normalized}". Allowed: ${ALLOWED.join(', ')}`,
        'readStatus',
      );
    }
    return new ReadStatusVO(normalized as ReadStatusValue);
  }

  static reconstitute(raw: string): ReadStatusVO {
    return new ReadStatusVO(raw as ReadStatusValue);
  }

  static unread(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.UNREAD); }
  static read(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.READ); }
  static archived(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.ARCHIVED); }
  static deleted(): ReadStatusVO { return new ReadStatusVO(NOTIFICATION_READ_STATUS.DELETED); }

  isUnread(): boolean { return this.value === NOTIFICATION_READ_STATUS.UNREAD; }
  isRead(): boolean { return this.value === NOTIFICATION_READ_STATUS.READ; }
  isArchived(): boolean { return this.value === NOTIFICATION_READ_STATUS.ARCHIVED; }
  isDeleted(): boolean { return this.value === NOTIFICATION_READ_STATUS.DELETED; }
  isStarred(): boolean { return this.value === NOTIFICATION_READ_STATUS.STARRED; }
  isSnoozed(): boolean { return this.value === NOTIFICATION_READ_STATUS.SNOOZED; }

  isVisible(): boolean {
    return !this.isDeleted();
  }
}
