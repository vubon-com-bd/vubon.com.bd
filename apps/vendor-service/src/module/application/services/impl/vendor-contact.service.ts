import { Injectable } from '@nestjs/common';
import { VendorContactEntity } from '../../../domain/entities/vendor-contact.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorContactRepository } from '../../../domain/repositories/vendor-contact.repository.interface';

@Injectable()
export class VendorContactService {
  constructor(private readonly repo: VendorContactRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorContactEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(contact: VendorContactEntity): Promise<void> {
    await this.repo.save(contact);
  }
}
