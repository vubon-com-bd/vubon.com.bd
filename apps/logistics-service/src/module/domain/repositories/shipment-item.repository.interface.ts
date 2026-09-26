import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ShipmentItemEntity } from '../entities/shipment-item.entity';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ShipmentItemRepository
  extends BaseRepository<ShipmentItemEntity, string> {
  findByShipment(shipmentId: ShipmentIdVO): Promise<readonly ShipmentItemEntity[]>;
  findByProduct(productId: ProductIdVO): Promise<readonly ShipmentItemEntity[]>;
}
