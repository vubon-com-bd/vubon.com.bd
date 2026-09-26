import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type WarehouseId = BrandedId<'WarehouseId'>;

export class WarehouseIdVO extends BaseVO<WarehouseId> {
  private constructor(value: WarehouseId) {
    super(value);
  }

  static create(raw: string): WarehouseIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('WarehouseId cannot be empty');
    }
    return new WarehouseIdVO(raw as WarehouseId);
  }
}
