import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { InsuranceEntity } from '../entities/insurance.entity';
import { InsuranceIdVO } from '../value-objects/primitives/insurance-id.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';

export interface InsuranceRepository
  extends BaseRepository<InsuranceEntity, InsuranceIdVO> {
  findByShipment(shipmentId: ShipmentIdVO): Promise<InsuranceEntity | null>;
  findByProvider(provider: string): Promise<readonly InsuranceEntity[]>;
  findByStatus(status: string): Promise<readonly InsuranceEntity[]>;
}
