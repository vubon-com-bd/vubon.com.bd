import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PUSH_PLATFORM } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(PUSH_PLATFORM));

export class DevicePlatformVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): DevicePlatformVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid device platform: ${raw}`);
    }
    return new DevicePlatformVO(raw);
  }
}
