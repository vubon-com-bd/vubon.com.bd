/**
 * ActionType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_ACTION } from '@vubon/shared-constants/platform';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ActionTypeValue = (typeof NOTIFICATION_ACTION)[keyof typeof NOTIFICATION_ACTION];

const ALLOWED = Object.values(NOTIFICATION_ACTION) as readonly string[];

export class ActionTypeVO extends BaseTypeVO<ActionTypeValue> {
  private constructor(value: ActionTypeValue) {
    super(value);
  }

  static create(raw: string): ActionTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError(`Invalid action type "${String(raw)}"`, 'actionType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new ValidationError(
        `Invalid action type "${normalized}". Allowed: ${ALLOWED.join(', ')}`,
        'actionType',
      );
    }
    return new ActionTypeVO(normalized as ActionTypeValue);
  }

  static reconstitute(raw: string): ActionTypeVO {
    return new ActionTypeVO(raw as ActionTypeValue);
  }

  isDestructive(): boolean {
    return (
      this.value === NOTIFICATION_ACTION.DELETE ||
      this.value === NOTIFICATION_ACTION.UNSUBSCRIBE ||
      this.value === NOTIFICATION_ACTION.REJECT
    );
  }

  isEngagement(): boolean {
    return (
      this.value === NOTIFICATION_ACTION.OPEN ||
      this.value === NOTIFICATION_ACTION.CLICK ||
      this.value === NOTIFICATION_ACTION.VIEW ||
      this.value === NOTIFICATION_ACTION.ACCEPT
    );
  }
}
