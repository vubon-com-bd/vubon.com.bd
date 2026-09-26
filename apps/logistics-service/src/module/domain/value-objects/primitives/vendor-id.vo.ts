import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type VendorRefId = BrandedId<'LogisticsVendorRefId'>;

export class VendorIdVO extends BaseVO<VendorRefId> {
  private constructor(value: VendorRefId) {
    super(value);
  }

  static create(raw: string): VendorIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('VendorId cannot be empty');
    }
    return new VendorIdVO(raw as VendorRefId);
  }
}
