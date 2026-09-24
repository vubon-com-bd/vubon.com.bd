import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_PREFERENCE_TYPE } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_PREFERENCE_TYPE));

export class PreferenceTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): PreferenceTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid preference type: ${raw}`);
    }
    return new PreferenceTypeVO(raw);
  }
}
