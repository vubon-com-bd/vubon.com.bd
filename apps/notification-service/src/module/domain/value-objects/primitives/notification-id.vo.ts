import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class NotificationIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('NotificationId cannot be empty');
    }
    return new NotificationIdVO(raw);
  }
}
