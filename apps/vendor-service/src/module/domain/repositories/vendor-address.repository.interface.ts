import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorAddressEntity } from '../entities/vendor-address.entity';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorAddressRepository
  extends BaseRepository<VendorAddressEntity, AddressIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorAddressEntity[]>;
  findDefault(vendorId: VendorIdVO): Promise<VendorAddressEntity | null>;
}
