import { Injectable } from '@nestjs/common';
import { VendorBusinessEntity } from '../../../domain/entities/vendor-business.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorBusinessRepository } from '../../../domain/repositories/vendor-business.repository.interface';

@Injectable()
export class VendorBusinessService {
  constructor(private readonly repo: VendorBusinessRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorBusinessEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(business: VendorBusinessEntity): Promise<void> {
    await this.repo.save(business);
  }
}
