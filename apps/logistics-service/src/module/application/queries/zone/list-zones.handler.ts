import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListZonesQuery } from './list-zones.query';
import type { ZoneRepository } from '../../../domain/repositories/zone.repository.interface';
import type { ZoneResponseDTO } from '../../dtos/responses/zone-response.dto';

@QueryHandler(ListZonesQuery)
export class ListZonesHandler
  extends BaseQueryHandler<ListZonesQuery, readonly ZoneResponseDTO[]>
  implements IQueryHandler<ListZonesQuery>
{
  readonly queryType = 'logistics.zone.list';

  constructor(private readonly repo: ZoneRepository) {
    super();
  }

  async execute(query: ListZonesQuery): Promise<readonly ZoneResponseDTO[]> {
    const entities = query.zoneType ? await this.repo.findByType(query.zoneType) : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as ZoneResponseDTO));
  }
}
