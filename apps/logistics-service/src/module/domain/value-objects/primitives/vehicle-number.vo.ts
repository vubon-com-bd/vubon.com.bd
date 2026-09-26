import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class VehicleNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VehicleNumberVO {
    BaseCodeVO.validateNonEmpty(raw, 'VehicleNumber');
    return new VehicleNumberVO(raw);
  }
}
