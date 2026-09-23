import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ShipmentItemEntity } from '../../../domain/entities/shipment-item.entity';

export interface ShipmentItemServiceInterface
  extends BaseServiceInterface<ShipmentItemEntity, string> {
  listByShipment(shipmentId: string): Promise<readonly ShipmentItemEntity[]>;
}
