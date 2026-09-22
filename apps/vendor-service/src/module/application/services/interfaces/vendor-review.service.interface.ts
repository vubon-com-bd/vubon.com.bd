import type { VendorReviewEntity } from '../../../domain/entities/vendor-review.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { ReviewIdVO } from '../../../domain/value-objects/primitives/review-id.vo';

export interface VendorReviewServiceInterface {
  findById(id: ReviewIdVO): Promise<VendorReviewEntity | null>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorReviewEntity[]>;
  save(review: VendorReviewEntity): Promise<void>;
}
