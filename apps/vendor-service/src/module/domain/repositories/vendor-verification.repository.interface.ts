import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorVerificationEntity } from '../entities/vendor-verification.entity';
import { VerificationIdVO } from '../value-objects/primitives/verification-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorVerificationRepository
  extends BaseRepository<VendorVerificationEntity, VerificationIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<VendorVerificationEntity | null>;
  findPending(): Promise<readonly VendorVerificationEntity[]>;
}
