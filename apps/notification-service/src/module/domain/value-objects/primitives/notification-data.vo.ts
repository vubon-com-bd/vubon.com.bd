/**
 * NotificationData Value Object — arbitrary JSON payload
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type NotificationDataValue = Readonly<Record<string, unknown>>;

const MAX_SIZE_BYTES = 100 * 1024; // 100 KB

export class NotificationDataVO extends BaseVO<NotificationDataValue> {
  private constructor(value: NotificationDataValue) {
    super(value);
  }

  static create(data: Readonly<Record<string, unknown>>): NotificationDataVO {
    if (data === null || typeof data !== 'object' || Array.isArray(data)) {
      throw new ValidationError('Notification data must be a plain object', 'data');
    }
    let json: string;
    try {
      json = JSON.stringify(data);
    } catch {
      throw new ValidationError('Notification data must be JSON-serializable', 'data');
    }
    if (json.length > MAX_SIZE_BYTES) {
      throw new ValidationError(
        `Notification data exceeds ${MAX_SIZE_BYTES} bytes`,
        'data',
      );
    }
    return new NotificationDataVO(Object.freeze({ ...data }));
  }

  static empty(): NotificationDataVO {
    return new NotificationDataVO(Object.freeze({}));
  }

  static reconstitute(data: NotificationDataValue): NotificationDataVO {
    return new NotificationDataVO(data);
  }

  get keys(): readonly string[] {
    return Object.keys(this.value);
  }

  get(key: string): unknown {
    return this.value[key];
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.value, key);
  }

  isEmpty(): boolean {
    return Object.keys(this.value).length === 0;
  }
}
