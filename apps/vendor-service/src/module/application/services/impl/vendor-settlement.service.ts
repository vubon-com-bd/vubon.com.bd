import { Injectable } from '@nestjs/common';
import { VendorSettlementEntity } from '../../../domain/entities/vendor-settlement.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { SettlementIdVO } from '../../../domain/value-objects/primitives/settlement-id.vo';
import type { VendorSettlementRepository } from '../../../domain/repositories/vendor-settlement.repository.interface';

@Injectable()
export class VendorSettlementService {
  constructor(private readonly repo: VendorSettlementRepository) {}

  async findById(id: SettlementIdVO): Promise<VendorSettlementEntity | null> {
    return this.repo.findById(id);
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSettlementEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(settlement: VendorSettlementEntity): Promise<void> {
    await this.repo.save(settlement);
  }
}
