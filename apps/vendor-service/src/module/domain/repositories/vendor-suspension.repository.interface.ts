import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSuspensionEntity } from '../entities/vendor-suspension.entity';
import { SuspensionIdVO } from '../value-objects/primitives/suspension-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorSuspensionRepository
  extends BaseRepository<VendorSuspensionEntity, SuspensionIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSuspensionEntity[]>;
  findActive(vendorId: VendorIdVO): Promise<VendorSuspensionEntity | null>;
}
