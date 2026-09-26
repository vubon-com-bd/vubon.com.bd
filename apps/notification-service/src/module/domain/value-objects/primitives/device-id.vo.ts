import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class DeviceIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('DeviceId cannot be empty');
    }
    return new DeviceIdVO(raw);
  }
}
