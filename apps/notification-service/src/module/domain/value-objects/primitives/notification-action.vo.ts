/**
 * NotificationAction Value Object — action enum (what the button does)
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_ACTION } from '@vubon/shared-constants/platform/notification';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

type ActionValue = (typeof NOTIFICATION_ACTION)[keyof typeof NOTIFICATION_ACTION];
const ALLOWED = Object.values(NOTIFICATION_ACTION) as readonly string[];

export class NotificationActionVO extends BaseTypeVO<ActionValue> {
  private constructor(value: ActionValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): NotificationActionVO {
    if (!ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid action "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'action',
      );
    }
    return new NotificationActionVO(raw as ActionValue);
  }

  static reconstitute(raw: string): NotificationActionVO {
    return new NotificationActionVO(raw as ActionValue);
  }

  static view(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.VIEW); }
  static open(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.OPEN); }
  static dismiss(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.DISMISS); }
  static accept(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.ACCEPT); }
  static reject(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.REJECT); }
  static confirm(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.CONFIRM); }
  static cancel(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.CANCEL); }
  static reply(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.REPLY); }
  static markRead(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.MARK_READ); }
  static markUnread(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.MARK_UNREAD); }
  static archive(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.ARCHIVE); }
  static delete(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.DELETE); }
  static snooze(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.SNOOZE); }
  static star(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.STAR); }
  static unsubscribe(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.UNSUBSCRIBE); }
  static retry(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.RETRY); }
  static click(): NotificationActionVO { return new NotificationActionVO(NOTIFICATION_ACTION.CLICK); }

  requiresUrl(): boolean {
    return (
      this.value === NOTIFICATION_ACTION.VIEW ||
      this.value === NOTIFICATION_ACTION.OPEN ||
      this.value === NOTIFICATION_ACTION.CLICK
    );
  }

  isDestructive(): boolean {
    return (
      this.value === NOTIFICATION_ACTION.DELETE ||
      this.value === NOTIFICATION_ACTION.REJECT ||
      this.value === NOTIFICATION_ACTION.CANCEL
    );
  }
}
