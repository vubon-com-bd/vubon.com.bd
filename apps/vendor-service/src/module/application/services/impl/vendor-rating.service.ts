import { Injectable } from '@nestjs/common';
import { VendorRatingEntity } from '../../../domain/entities/vendor-rating.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorRatingRepository } from '../../../domain/repositories/vendor-rating.repository.interface';

@Injectable()
export class VendorRatingService {
  constructor(private readonly repo: VendorRatingRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorRatingEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(rating: VendorRatingEntity): Promise<void> {
    await this.repo.save(rating);
  }
}
