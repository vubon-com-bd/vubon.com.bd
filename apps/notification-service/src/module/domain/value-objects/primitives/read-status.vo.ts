import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_READ_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_READ_STATUS));

export class ReadStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): ReadStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid read status: ${raw}`);
    }
    return new ReadStatusVO(raw);
  }

  isRead(): boolean {
    return this.value === NOTIFICATION_READ_STATUS.READ;
  }

  isUnread(): boolean {
    return this.value === NOTIFICATION_READ_STATUS.UNREAD;
  }

  isArchived(): boolean {
    return this.value === NOTIFICATION_READ_STATUS.ARCHIVED;
  }
}
