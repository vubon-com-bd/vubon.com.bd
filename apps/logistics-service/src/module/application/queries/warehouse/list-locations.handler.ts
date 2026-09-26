import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListLocationsQuery } from './list-locations.query';
import type { InventoryLocationRepository } from '../../../domain/repositories/inventory-location.repository.interface';
import type { InventoryLocationEntity } from '../../../domain/entities/inventory-location.entity';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo';

@QueryHandler(ListLocationsQuery)
export class ListLocationsHandler
  extends BaseQueryHandler<ListLocationsQuery, readonly InventoryLocationEntity[]>
  implements IQueryHandler<ListLocationsQuery>
{
  readonly queryType = 'logistics.warehouse.list-locations';

  constructor(private readonly repo: InventoryLocationRepository) {
    super();
  }

  async execute(query: ListLocationsQuery): Promise<readonly InventoryLocationEntity[]> {
    const wid = WarehouseIdVO.create(query.warehouseId);
    return query.availableOnly ? this.repo.findAvailable(wid) : this.repo.findByWarehouse(wid);
  }
}
