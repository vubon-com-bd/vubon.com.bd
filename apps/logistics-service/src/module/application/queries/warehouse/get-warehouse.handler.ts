import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetWarehouseQuery } from './get-warehouse.query';
import type { WarehouseRepository } from '../../../domain/repositories/warehouse.repository.interface';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse-response.dto';

@QueryHandler(GetWarehouseQuery)
export class GetWarehouseHandler
  extends BaseQueryHandler<GetWarehouseQuery, WarehouseResponseDTO | null>
  implements IQueryHandler<GetWarehouseQuery>
{
  readonly queryType = 'logistics.warehouse.get';

  constructor(private readonly repo: WarehouseRepository) {
    super();
  }

  async execute(query: GetWarehouseQuery): Promise<WarehouseResponseDTO | null> {
    const entity = await this.repo.findById(WarehouseIdVO.create(query.warehouseId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as WarehouseResponseDTO;
  }
}
