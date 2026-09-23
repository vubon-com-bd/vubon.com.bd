import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ReturnShipmentEntity } from '../entities/return-shipment.entity';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';

export interface ReturnShipmentRepository
  extends BaseRepository<ReturnShipmentEntity, string> {
  findByShipment(shipmentId: ShipmentIdVO): Promise<readonly ReturnShipmentEntity[]>;
  findByStatus(status: string): Promise<readonly ReturnShipmentEntity[]>;
  findPending(): Promise<readonly ReturnShipmentEntity[]>;
}
