import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_BROADCAST_TYPE } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_BROADCAST_TYPE));

export class BroadcastTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): BroadcastTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid broadcast type: ${raw}`);
    }
    return new BroadcastTypeVO(raw);
  }
}
