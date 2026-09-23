import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetZoneQuery } from './get-zone.query';
import type { ZoneRepository } from '../../../domain/repositories/zone.repository.interface';
import { ZoneIdVO } from '../../../domain/value-objects/primitives/zone-id.vo';
import type { ZoneResponseDTO } from '../../dtos/responses/zone-response.dto';

@QueryHandler(GetZoneQuery)
export class GetZoneHandler
  extends BaseQueryHandler<GetZoneQuery, ZoneResponseDTO | null>
  implements IQueryHandler<GetZoneQuery>
{
  readonly queryType = 'logistics.zone.get';

  constructor(private readonly repo: ZoneRepository) {
    super();
  }

  async execute(query: GetZoneQuery): Promise<ZoneResponseDTO | null> {
    const entity = await this.repo.findById(ZoneIdVO.create(query.zoneId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as ZoneResponseDTO;
  }
}
