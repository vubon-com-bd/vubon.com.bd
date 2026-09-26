import { Injectable } from '@nestjs/common';
import { VendorProfileEntity } from '../../../domain/entities/vendor-profile.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorProfileRepository } from '../../../domain/repositories/vendor-profile.repository.interface';

@Injectable()
export class VendorProfileService {
  constructor(private readonly repo: VendorProfileRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorProfileEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(profile: VendorProfileEntity): Promise<void> {
    await this.repo.save(profile);
  }
}
