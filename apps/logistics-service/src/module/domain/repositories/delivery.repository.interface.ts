import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';

export interface DeliveryRepository
  extends BaseRepository<DeliveryEntity, DeliveryIdVO> {
  findByShipment(shipmentId: ShipmentIdVO): Promise<readonly DeliveryEntity[]>;
  findByStatus(status: string): Promise<readonly DeliveryEntity[]>;
  findPending(): Promise<readonly DeliveryEntity[]>;
}
