import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DEVICE_TYPE } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_DEVICE_TYPE));

export class DeviceTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): DeviceTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid device type: ${raw}`);
    }
    return new DeviceTypeVO(raw);
  }
}
