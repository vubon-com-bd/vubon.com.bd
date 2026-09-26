import { Injectable } from '@nestjs/common';
import { VendorFeatureEntity } from '../../../domain/entities/vendor-feature.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorFeatureRepository } from '../../../domain/repositories/vendor-feature.repository.interface';

@Injectable()
export class VendorFeatureService {
  constructor(private readonly repo: VendorFeatureRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorFeatureEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(feature: VendorFeatureEntity): Promise<void> {
    await this.repo.save(feature);
  }
}
