import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorReviewEntity } from '../entities/vendor-review.entity';
import { ReviewIdVO } from '../value-objects/primitives/review-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorReviewRepository
  extends BaseRepository<VendorReviewEntity, ReviewIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorReviewEntity[]>;
  findApproved(vendorId: VendorIdVO): Promise<readonly VendorReviewEntity[]>;
  countByVendor(vendorId: VendorIdVO): Promise<number>;
}
