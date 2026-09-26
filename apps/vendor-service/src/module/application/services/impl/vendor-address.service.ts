import { Injectable } from '@nestjs/common';
import { VendorAddressEntity } from '../../../domain/entities/vendor-address.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorAddressRepository } from '../../../domain/repositories/vendor-address.repository.interface';

@Injectable()
export class VendorAddressService {
  constructor(private readonly repo: VendorAddressRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorAddressEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(address: VendorAddressEntity): Promise<void> {
    await this.repo.save(address);
  }
}
