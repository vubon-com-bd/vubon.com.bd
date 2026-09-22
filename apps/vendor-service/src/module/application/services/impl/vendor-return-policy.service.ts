import { Injectable } from '@nestjs/common';
import { VendorReturnPolicyEntity } from '../../../domain/entities/vendor-return-policy.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorReturnPolicyRepository } from '../../../domain/repositories/vendor-return-policy.repository.interface';

@Injectable()
export class VendorReturnPolicyService {
  constructor(private readonly repo: VendorReturnPolicyRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorReturnPolicyEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(policy: VendorReturnPolicyEntity): Promise<void> {
    await this.repo.save(policy);
  }
}
