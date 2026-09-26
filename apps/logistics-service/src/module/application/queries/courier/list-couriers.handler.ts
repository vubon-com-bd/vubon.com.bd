import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListCouriersQuery } from './list-couriers.query';
import type { CourierRepository } from '../../../domain/repositories/courier.repository.interface';
import type { CourierResponseDTO } from '../../dtos/responses/courier-response.dto';

@QueryHandler(ListCouriersQuery)
export class ListCouriersHandler
  extends BaseQueryHandler<ListCouriersQuery, readonly CourierResponseDTO[]>
  implements IQueryHandler<ListCouriersQuery>
{
  readonly queryType = 'logistics.courier.list';

  constructor(private readonly repo: CourierRepository) {
    super();
  }

  async execute(query: ListCouriersQuery): Promise<readonly CourierResponseDTO[]> {
    const entities = query.activeOnly ? await this.repo.findActive() : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as CourierResponseDTO));
  }
}
