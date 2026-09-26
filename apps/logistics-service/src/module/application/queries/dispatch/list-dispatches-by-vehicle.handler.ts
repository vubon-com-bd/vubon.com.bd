import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDispatchesByVehicleQuery } from './list-dispatches-by-vehicle.query';
import type { DispatchRepository } from '../../../domain/repositories/dispatch.repository.interface';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@QueryHandler(ListDispatchesByVehicleQuery)
export class ListDispatchesByVehicleHandler
  extends BaseQueryHandler<ListDispatchesByVehicleQuery, readonly DispatchResponseDTO[]>
  implements IQueryHandler<ListDispatchesByVehicleQuery>
{
  readonly queryType = 'logistics.dispatch.list-by-vehicle';

  constructor(private readonly repo: DispatchRepository) {
    super();
  }

  async execute(query: ListDispatchesByVehicleQuery): Promise<readonly DispatchResponseDTO[]> {
    const entities = await this.repo.findByVehicle(VehicleIdVO.create(query.vehicleId));
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as DispatchResponseDTO));
  }
}
