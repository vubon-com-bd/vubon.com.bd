/**
 * NotificationBody Value Object — main content
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 1;
const MAX = 5000;

export class NotificationBodyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationBodyVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Notification body must be a string', 'body');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN) {
      throw new ValidationError('Notification body cannot be empty', 'body');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Notification body exceeds ${MAX} chars`, 'body');
    }
    return new NotificationBodyVO(trimmed);
  }

  static reconstitute(raw: string): NotificationBodyVO {
    return new NotificationBodyVO(raw);
  }

  get length(): number {
    return this.value.length;
  }
}
