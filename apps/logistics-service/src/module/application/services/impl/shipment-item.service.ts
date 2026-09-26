import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ShipmentItemServiceInterface } from '../interfaces/shipment-item.service.interface';
import type { ShipmentItemRepository } from '../../../domain/repositories/shipment-item.repository.interface';
import type { ShipmentItemEntity } from '../../../domain/entities/shipment-item.entity';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';

@Injectable()
export class ShipmentItemService
  extends BaseService<ShipmentItemEntity, string>
  implements ShipmentItemServiceInterface
{
  readonly name = 'ShipmentItemService';

  constructor(private readonly repo: ShipmentItemRepository) {
    super();
  }

  async listByShipment(shipmentId: string): Promise<readonly ShipmentItemEntity[]> {
    return this.repo.findByShipment(ShipmentIdVO.create(shipmentId));
  }
}
