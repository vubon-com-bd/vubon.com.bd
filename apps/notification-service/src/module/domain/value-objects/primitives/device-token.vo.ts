import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class DeviceTokenVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 4096;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceTokenVO {
    BaseCodeVO.validateNonEmpty(raw, 'DeviceToken');
    if (raw.length > DeviceTokenVO.MAX_LENGTH) {
      throw new Error(`DeviceToken too long (max ${DeviceTokenVO.MAX_LENGTH})`);
    }
    return new DeviceTokenVO(raw);
  }
}
