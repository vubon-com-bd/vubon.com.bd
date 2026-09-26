import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDeliveriesQuery } from './list-deliveries.query';
import type { DeliveryRepository } from '../../../domain/repositories/delivery.repository.interface';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@QueryHandler(ListDeliveriesQuery)
export class ListDeliveriesHandler
  extends BaseQueryHandler<ListDeliveriesQuery, readonly DeliveryResponseDTO[]>
  implements IQueryHandler<ListDeliveriesQuery>
{
  readonly queryType = 'logistics.delivery.list';

  constructor(private readonly repo: DeliveryRepository) {
    super();
  }

  async execute(query: ListDeliveriesQuery): Promise<readonly DeliveryResponseDTO[]> {
    const entities = await this.repo.findByShipment(ShipmentIdVO.create(query.shipmentId));
    return entities.map((e) => ({
      id: e.id.value,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    } as unknown as DeliveryResponseDTO));
  }
}
