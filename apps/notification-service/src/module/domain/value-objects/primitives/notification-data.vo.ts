/**
 * NotificationData Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidNotificationDataError } from '@domain/errors/notification.errors.js';

const MAX_SIZE_BYTES = 64 * 1024; // 64KB

export class NotificationDataVO extends BaseVO<Readonly<Record<string, unknown>>> {
  private constructor(value: Readonly<Record<string, unknown>>) {
    super(value);
  }

  static create(raw: Record<string, unknown> | undefined | null): NotificationDataVO {
    if (raw === undefined || raw === null) {
      return new NotificationDataVO(Object.freeze({}));
    }
    if (typeof raw !== 'object' || Array.isArray(raw)) {
      throw new InvalidNotificationDataError('must be a plain object');
    }
    const size = JSON.stringify(raw).length;
    if (size > MAX_SIZE_BYTES) {
      throw new InvalidNotificationDataError(`exceeds maximum size ${MAX_SIZE_BYTES} bytes`);
    }
    return new NotificationDataVO(Object.freeze({ ...raw }));
  }

  static reconstitute(raw: Readonly<Record<string, unknown>>): NotificationDataVO {
    return new NotificationDataVO(Object.freeze({ ...raw }));
  }

  get keyCount(): number {
    return Object.keys(this.value).length;
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.value, key);
  }

  get<T = unknown>(key: string): T | undefined {
    return this.value[key] as T | undefined;
  }
}
