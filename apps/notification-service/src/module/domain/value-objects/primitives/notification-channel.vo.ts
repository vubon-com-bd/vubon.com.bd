import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_CHANNEL));

export class NotificationChannelVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): NotificationChannelVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid notification channel: ${raw}`);
    }
    return new NotificationChannelVO(raw);
  }
}
