import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DEVICE_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_DEVICE_STATUS));

export class DeviceStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): DeviceStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid device status: ${raw}`);
    }
    return new DeviceStatusVO(raw);
  }

  isActive(): boolean {
    return this.value === 'active';
  }
}
