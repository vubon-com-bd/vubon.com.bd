import { Injectable } from '@nestjs/common';
import { VendorPayoutEntity } from '../../../domain/entities/vendor-payout.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { PayoutIdVO } from '../../../domain/value-objects/primitives/payout-id.vo';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';

@Injectable()
export class VendorPayoutService {
  constructor(private readonly repo: VendorPayoutRepository) {}

  async findById(id: PayoutIdVO): Promise<VendorPayoutEntity | null> {
    return this.repo.findById(id);
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorPayoutEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(payout: VendorPayoutEntity): Promise<void> {
    await this.repo.save(payout);
  }
}
