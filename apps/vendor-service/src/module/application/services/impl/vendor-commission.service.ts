import { Injectable } from '@nestjs/common';
import { VendorCommissionEntity } from '../../../domain/entities/vendor-commission.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { CommissionIdVO } from '../../../domain/value-objects/primitives/commission-id.vo';
import type { VendorCommissionRepository } from '../../../domain/repositories/vendor-commission.repository.interface';

@Injectable()
export class VendorCommissionService {
  constructor(private readonly repo: VendorCommissionRepository) {}

  async findById(id: CommissionIdVO): Promise<VendorCommissionEntity | null> {
    return this.repo.findById(id);
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorCommissionEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(commission: VendorCommissionEntity): Promise<void> {
    await this.repo.save(commission);
  }
}
