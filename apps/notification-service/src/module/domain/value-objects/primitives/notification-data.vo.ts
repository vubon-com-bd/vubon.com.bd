import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class NotificationDataVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationDataVO {
    BaseCodeVO.validateNonEmpty(raw, 'NotificationData');
    return new NotificationDataVO(raw);
  }

  static fromObject(obj: Record<string, unknown>): NotificationDataVO {
    return new NotificationDataVO(JSON.stringify(obj));
  }

  toObject(): Record<string, unknown> {
    return JSON.parse(this.value) as Record<string, unknown>;
  }
}
