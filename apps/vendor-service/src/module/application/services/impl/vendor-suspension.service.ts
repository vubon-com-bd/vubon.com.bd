import { Injectable } from '@nestjs/common';
import { VendorSuspensionEntity } from '../../../domain/entities/vendor-suspension.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorSuspensionRepository } from '../../../domain/repositories/vendor-suspension.repository.interface';

@Injectable()
export class VendorSuspensionService {
  constructor(private readonly repo: VendorSuspensionRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSuspensionEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(suspension: VendorSuspensionEntity): Promise<void> {
    await this.repo.save(suspension);
  }
}
