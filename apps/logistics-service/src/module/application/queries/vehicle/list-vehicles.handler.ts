import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListVehiclesQuery } from './list-vehicles.query';
import type { VehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle-response.dto';

@QueryHandler(ListVehiclesQuery)
export class ListVehiclesHandler
  extends BaseQueryHandler<ListVehiclesQuery, readonly VehicleResponseDTO[]>
  implements IQueryHandler<ListVehiclesQuery>
{
  readonly queryType = 'logistics.vehicle.list';

  constructor(private readonly repo: VehicleRepository) {
    super();
  }

  async execute(query: ListVehiclesQuery): Promise<readonly VehicleResponseDTO[]> {
    const entities = query.availableOnly ? await this.repo.findAvailable() : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as VehicleResponseDTO));
  }
}
