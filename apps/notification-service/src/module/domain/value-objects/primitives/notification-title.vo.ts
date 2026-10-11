/**
 * NotificationTitle Value Object — display title / subject
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 1;
const MAX = 200;

export class NotificationTitleVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationTitleVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Notification title must be a string', 'title');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN) {
      throw new ValidationError('Notification title cannot be empty', 'title');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Notification title exceeds ${MAX} chars`, 'title');
    }
    return new NotificationTitleVO(trimmed);
  }

  static reconstitute(raw: string): NotificationTitleVO {
    return new NotificationTitleVO(raw);
  }

  get length(): number {
    return this.value.length;
  }
}
