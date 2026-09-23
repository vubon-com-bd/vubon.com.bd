import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type VehicleId = BrandedId<'VehicleId'>;

export class VehicleIdVO extends BaseVO<VehicleId> {
  private constructor(value: VehicleId) {
    super(value);
  }

  static create(raw: string): VehicleIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('VehicleId cannot be empty');
    }
    return new VehicleIdVO(raw as VehicleId);
  }
}
