import type { VendorSettlementEntity } from '../../../domain/entities/vendor-settlement.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { SettlementIdVO } from '../../../domain/value-objects/primitives/settlement-id.vo';

export interface VendorSettlementServiceInterface {
  findById(id: SettlementIdVO): Promise<VendorSettlementEntity | null>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSettlementEntity[]>;
  save(settlement: VendorSettlementEntity): Promise<void>;
}
