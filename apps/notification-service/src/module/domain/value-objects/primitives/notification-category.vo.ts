import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_CATEGORY } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_CATEGORY));

export class NotificationCategoryVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): NotificationCategoryVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid notification category: ${raw}`);
    }
    return new NotificationCategoryVO(raw);
  }
}
