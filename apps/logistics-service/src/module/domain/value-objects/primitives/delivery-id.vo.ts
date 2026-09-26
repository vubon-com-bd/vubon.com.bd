import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type DeliveryId = BrandedId<'DeliveryId'>;

export class DeliveryIdVO extends BaseVO<DeliveryId> {
  private constructor(value: DeliveryId) {
    super(value);
  }

  static create(raw: string): DeliveryIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('DeliveryId cannot be empty');
    }
    return new DeliveryIdVO(raw as DeliveryId);
  }
}
