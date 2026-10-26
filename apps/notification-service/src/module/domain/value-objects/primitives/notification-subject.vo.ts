/**
 * NotificationSubject Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidNotificationSubjectError } from '@domain/errors/notification.errors.js';

const MAX_LENGTH = 200;
const MIN_LENGTH = 1;

export class NotificationSubjectVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationSubjectVO {
    if (typeof raw !== 'string') {
      throw new InvalidNotificationSubjectError('must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new InvalidNotificationSubjectError('cannot be empty');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidNotificationSubjectError(`exceeds maximum length ${MAX_LENGTH}`);
    }
    if (/[\r\n]/.test(trimmed)) {
      throw new InvalidNotificationSubjectError('cannot contain newlines');
    }
    return new NotificationSubjectVO(trimmed);
  }

  static reconstitute(raw: string): NotificationSubjectVO {
    return new NotificationSubjectVO(raw);
  }
}
