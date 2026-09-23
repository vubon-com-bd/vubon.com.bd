import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListWarehousesQuery } from './list-warehouses.query';
import type { WarehouseRepository } from '../../../domain/repositories/warehouse.repository.interface';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse-response.dto';

@QueryHandler(ListWarehousesQuery)
export class ListWarehousesHandler
  extends BaseQueryHandler<ListWarehousesQuery, readonly WarehouseResponseDTO[]>
  implements IQueryHandler<ListWarehousesQuery>
{
  readonly queryType = 'logistics.warehouse.list';

  constructor(private readonly repo: WarehouseRepository) {
    super();
  }

  async execute(query: ListWarehousesQuery): Promise<readonly WarehouseResponseDTO[]> {
    const entities = query.division ? await this.repo.findByDivision(query.division) : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as WarehouseResponseDTO));
  }
}
