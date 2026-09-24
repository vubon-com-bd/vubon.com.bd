import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFunnelQuery } from './get-funnel.query';
import type { FunnelRepository } from '../../../domain/repositories/funnel.repository.interface';
import { FunnelIdVO } from '../../../domain/value-objects/primitives/funnel-id.vo';
import { FunnelNotFoundError } from '../../../domain/errors/funnel.errors';
import {
  type FunnelResponseDTO,
  toFunnelResponse,
} from '../../dtos/responses';

@QueryHandler(GetFunnelQuery)
export class GetFunnelHandler
  extends BaseQueryHandler<GetFunnelQuery, FunnelResponseDTO>
  implements IQueryHandler<GetFunnelQuery>
{
  readonly queryType = 'analytics.funnel.get';

  constructor(private readonly funnelRepo: FunnelRepository) {
    super();
  }

  async execute(query: GetFunnelQuery): Promise<FunnelResponseDTO> {
    const entity = await this.funnelRepo.findById(FunnelIdVO.create(query.funnelId));
    if (!entity) throw new FunnelNotFoundError(query.funnelId);
    return toFunnelResponse(entity);
  }
}
