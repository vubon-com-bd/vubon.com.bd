import { Injectable } from '@nestjs/common';
import { ShipmentItemEntity } from '../../domain/entities/shipment-item.entity';

@Injectable()
export class ShipmentItemMapper {
  toPlain(entity: ShipmentItemEntity): Record<string, unknown> {
    return {
      id: entity.id,
      shipmentId: entity.shipmentId.value,
      productId: entity.productId.value,
      quantity: entity.quantity,
    };
  }
}
