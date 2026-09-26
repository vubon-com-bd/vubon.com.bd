import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class NotificationBodyVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 100_000;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationBodyVO {
    BaseCodeVO.validateNonEmpty(raw, 'NotificationBody');
    if (raw.length > NotificationBodyVO.MAX_LENGTH) {
      throw new Error(
        `NotificationBody too long (max ${NotificationBodyVO.MAX_LENGTH})`,
      );
    }
    return new NotificationBodyVO(raw);
  }
}
