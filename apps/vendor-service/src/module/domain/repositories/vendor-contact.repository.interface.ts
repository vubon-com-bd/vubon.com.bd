import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorContactEntity } from '../entities/vendor-contact.entity';
import { ContactIdVO } from '../value-objects/primitives/contact-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorContactRepository
  extends BaseRepository<VendorContactEntity, ContactIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorContactEntity[]>;
  findPrimary(vendorId: VendorIdVO): Promise<VendorContactEntity | null>;
}
