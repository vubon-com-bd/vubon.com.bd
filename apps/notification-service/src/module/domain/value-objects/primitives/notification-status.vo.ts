import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_STATUS));

export class NotificationStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): NotificationStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid notification status: ${raw}`);
    }
    return new NotificationStatusVO(raw);
  }
}
