import { Injectable } from '@nestjs/common';
import { VendorVerificationEntity } from '../../../domain/entities/vendor-verification.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorVerificationRepository } from '../../../domain/repositories/vendor-verification.repository.interface';

@Injectable()
export class VendorVerificationService {
  constructor(private readonly repo: VendorVerificationRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorVerificationEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(verification: VendorVerificationEntity): Promise<void> {
    await this.repo.save(verification);
  }
}
