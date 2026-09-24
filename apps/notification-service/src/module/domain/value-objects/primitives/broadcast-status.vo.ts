import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_BROADCAST_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_BROADCAST_STATUS));

export class BroadcastStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): BroadcastStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid broadcast status: ${raw}`);
    }
    return new BroadcastStatusVO(raw);
  }
}
