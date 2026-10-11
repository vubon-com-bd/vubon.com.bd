/**
 * NotificationActionType Value Object — visual style of action button
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_ACTION_TYPE } from '@vubon/shared-constants/platform/notification';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

type ActionTypeValue = (typeof NOTIFICATION_ACTION_TYPE)[keyof typeof NOTIFICATION_ACTION_TYPE];
const ALLOWED = Object.values(NOTIFICATION_ACTION_TYPE) as readonly string[];

export class NotificationActionTypeVO extends BaseTypeVO<ActionTypeValue> {
  private constructor(value: ActionTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): NotificationActionTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid action type "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'actionType',
      );
    }
    return new NotificationActionTypeVO(raw as ActionTypeValue);
  }

  static reconstitute(raw: string): NotificationActionTypeVO {
    return new NotificationActionTypeVO(raw as ActionTypeValue);
  }

  static primary(): NotificationActionTypeVO { return new NotificationActionTypeVO(NOTIFICATION_ACTION_TYPE.PRIMARY); }
  static secondary(): NotificationActionTypeVO { return new NotificationActionTypeVO(NOTIFICATION_ACTION_TYPE.SECONDARY); }
  static danger(): NotificationActionTypeVO { return new NotificationActionTypeVO(NOTIFICATION_ACTION_TYPE.DANGER); }
  static link(): NotificationActionTypeVO { return new NotificationActionTypeVO(NOTIFICATION_ACTION_TYPE.LINK); }
  static button(): NotificationActionTypeVO { return new NotificationActionTypeVO(NOTIFICATION_ACTION_TYPE.BUTTON); }

  isPrimary(): boolean { return this.value === NOTIFICATION_ACTION_TYPE.PRIMARY; }
  isDanger(): boolean { return this.value === NOTIFICATION_ACTION_TYPE.DANGER; }
}
