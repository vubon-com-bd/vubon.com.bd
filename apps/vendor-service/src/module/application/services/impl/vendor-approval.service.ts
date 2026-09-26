import { Injectable } from '@nestjs/common';
import { VendorApprovalEntity } from '../../../domain/entities/vendor-approval.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorApprovalRepository } from '../../../domain/repositories/vendor-approval.repository.interface';

@Injectable()
export class VendorApprovalService {
  constructor(private readonly repo: VendorApprovalRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorApprovalEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(approval: VendorApprovalEntity): Promise<void> {
    await this.repo.save(approval);
  }
}
