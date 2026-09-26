import { Injectable } from '@nestjs/common';
import { VendorReviewEntity } from '../../../domain/entities/vendor-review.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { ReviewIdVO } from '../../../domain/value-objects/primitives/review-id.vo';
import type { VendorReviewRepository } from '../../../domain/repositories/vendor-review.repository.interface';

@Injectable()
export class VendorReviewService {
  constructor(private readonly repo: VendorReviewRepository) {}

  async findById(id: ReviewIdVO): Promise<VendorReviewEntity | null> {
    return this.repo.findById(id);
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorReviewEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(review: VendorReviewEntity): Promise<void> {
    await this.repo.save(review);
  }
}
