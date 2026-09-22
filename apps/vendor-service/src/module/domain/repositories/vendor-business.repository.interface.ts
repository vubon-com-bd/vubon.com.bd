import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorBusinessEntity } from '../entities/vendor-business.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorBusinessRepository
  extends BaseRepository<VendorBusinessEntity, VendorIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorBusinessEntity | null>;
}
