import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVehicleQuery } from './get-vehicle.query';
import type { VehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle-response.dto';

@QueryHandler(GetVehicleQuery)
export class GetVehicleHandler
  extends BaseQueryHandler<GetVehicleQuery, VehicleResponseDTO | null>
  implements IQueryHandler<GetVehicleQuery>
{
  readonly queryType = 'logistics.vehicle.get';

  constructor(private readonly repo: VehicleRepository) {
    super();
  }

  async execute(query: GetVehicleQuery): Promise<VehicleResponseDTO | null> {
    const entity = await this.repo.findById(VehicleIdVO.create(query.vehicleId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as VehicleResponseDTO;
  }
}
