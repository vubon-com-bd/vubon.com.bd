import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetShipmentByOrderQuery } from './get-shipment-by-order.query';
import type { ShipmentRepository } from '../../../domain/repositories/shipment.repository.interface';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

@QueryHandler(GetShipmentByOrderQuery)
export class GetShipmentByOrderHandler
  extends BaseQueryHandler<GetShipmentByOrderQuery, readonly ShipmentResponseDTO[]>
  implements IQueryHandler<GetShipmentByOrderQuery>
{
  readonly queryType = 'logistics.shipment.get-by-order';

  constructor(private readonly repo: ShipmentRepository) {
    super();
  }

  async execute(query: GetShipmentByOrderQuery): Promise<readonly ShipmentResponseDTO[]> {
    const entities = await this.repo.findByOrder(OrderIdVO.create(query.orderId));
    return entities.map((e) => ({
      id: e.id.value,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    } as unknown as ShipmentResponseDTO));
  }
}
