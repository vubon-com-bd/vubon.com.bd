import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ShipmentEntity } from '../entities/shipment.entity';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import { ShipmentNumberVO } from '../value-objects/primitives/shipment-number.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface ShipmentRepository
  extends BaseRepository<ShipmentEntity, ShipmentIdVO> {
  findByNumber(number: ShipmentNumberVO): Promise<ShipmentEntity | null>;
  findByOrder(orderId: OrderIdVO): Promise<readonly ShipmentEntity[]>;
  findByStatus(status: string): Promise<readonly ShipmentEntity[]>;
  findByVendor(vendorId: VendorIdVO): Promise<readonly ShipmentEntity[]>;
}
