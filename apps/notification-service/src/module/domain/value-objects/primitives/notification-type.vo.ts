import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_TYPE));

export class NotificationTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): NotificationTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid notification type: ${raw}`);
    }
    return new NotificationTypeVO(raw);
  }
}
