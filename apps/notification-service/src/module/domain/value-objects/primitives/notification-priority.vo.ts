import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_PRIORITY));

export class NotificationPriorityVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): NotificationPriorityVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid notification priority: ${raw}`);
    }
    return new NotificationPriorityVO(raw);
  }
}
