import { Injectable } from '@nestjs/common';
import { VendorWarrantyEntity } from '../../../domain/entities/vendor-warranty.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorWarrantyRepository } from '../../../domain/repositories/vendor-warranty.repository.interface';

@Injectable()
export class VendorWarrantyService {
  constructor(private readonly repo: VendorWarrantyRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorWarrantyEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(warranty: VendorWarrantyEntity): Promise<void> {
    await this.repo.save(warranty);
  }
}
