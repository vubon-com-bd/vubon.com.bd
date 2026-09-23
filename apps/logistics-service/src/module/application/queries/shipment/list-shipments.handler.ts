import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListShipmentsQuery } from './list-shipments.query';
import type { ShipmentRepository } from '../../../domain/repositories/shipment.repository.interface';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

@QueryHandler(ListShipmentsQuery)
export class ListShipmentsHandler
  extends BaseQueryHandler<ListShipmentsQuery, readonly ShipmentResponseDTO[]>
  implements IQueryHandler<ListShipmentsQuery>
{
  readonly queryType = 'logistics.shipment.list';

  constructor(private readonly repo: ShipmentRepository) {
    super();
  }

  async execute(query: ListShipmentsQuery): Promise<readonly ShipmentResponseDTO[]> {
    void query;
    const entities = await this.repo.findAll();
    return entities.map((e) => ({
      id: e.id.value,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    } as unknown as ShipmentResponseDTO));
  }
}
