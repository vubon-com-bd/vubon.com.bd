import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_ACTION } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_ACTION));

export class ActionTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): ActionTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid action type: ${raw}`);
    }
    return new ActionTypeVO(raw);
  }
}
