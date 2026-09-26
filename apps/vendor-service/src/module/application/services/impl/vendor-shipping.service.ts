import { Injectable } from '@nestjs/common';
import { VendorShippingEntity } from '../../../domain/entities/vendor-shipping.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorShippingRepository } from '../../../domain/repositories/vendor-shipping.repository.interface';

@Injectable()
export class VendorShippingService {
  constructor(private readonly repo: VendorShippingRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorShippingEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(shipping: VendorShippingEntity): Promise<void> {
    await this.repo.save(shipping);
  }
}
