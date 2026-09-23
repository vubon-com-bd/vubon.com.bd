import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type ShipmentId = BrandedId<'ShipmentId'>;

export class ShipmentIdVO extends BaseVO<ShipmentId> {
  private constructor(value: ShipmentId) {
    super(value);
  }

  static create(raw: string): ShipmentIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ShipmentId cannot be empty');
    }
    return new ShipmentIdVO(raw as ShipmentId);
  }
}
