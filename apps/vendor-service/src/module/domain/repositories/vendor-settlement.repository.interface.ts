import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSettlementEntity } from '../entities/vendor-settlement.entity';
import { SettlementIdVO } from '../value-objects/primitives/settlement-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorSettlementRepository
  extends BaseRepository<VendorSettlementEntity, SettlementIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSettlementEntity[]>;
  findDue(): Promise<readonly VendorSettlementEntity[]>;
}
