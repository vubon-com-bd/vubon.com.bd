/**
 * NotificationBody Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidNotificationBodyError } from '@domain/errors/notification.errors.js';

const MAX_LENGTH = 500_000;
const MIN_LENGTH = 1;

export class NotificationBodyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationBodyVO {
    if (typeof raw !== 'string') {
      throw new InvalidNotificationBodyError('must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new InvalidNotificationBodyError('cannot be empty');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidNotificationBodyError(`exceeds maximum length ${MAX_LENGTH}`);
    }
    return new NotificationBodyVO(trimmed);
  }

  static reconstitute(raw: string): NotificationBodyVO {
    return new NotificationBodyVO(raw);
  }

  get isEmpty(): boolean {
    return this.value.length === 0;
  }

  get length(): number {
    return this.value.length;
  }
}
