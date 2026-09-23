import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type AddressRefId = BrandedId<'LogisticsAddressRefId'>;

export class AddressIdVO extends BaseVO<AddressRefId> {
  private constructor(value: AddressRefId) {
    super(value);
  }

  static create(raw: string): AddressIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('AddressId cannot be empty');
    }
    return new AddressIdVO(raw as AddressRefId);
  }
}
