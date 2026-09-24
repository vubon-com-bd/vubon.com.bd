import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class NotificationSubjectVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 200;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationSubjectVO {
    BaseCodeVO.validateNonEmpty(raw, 'NotificationSubject');
    const trimmed = raw.trim();
    if (trimmed.length > NotificationSubjectVO.MAX_LENGTH) {
      throw new Error(
        `NotificationSubject too long (max ${NotificationSubjectVO.MAX_LENGTH})`,
      );
    }
    return new NotificationSubjectVO(trimmed);
  }
}
