import { FunnelService } from '../../services/impl/funnel.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetFunnelQuery } from './get-funnel.query.js';
import type { FunnelResponseData } from '../../dtos/responses/funnel-response.dto.js';

@Injectable()
@QueryHandler(GetFunnelQuery)
export class GetFunnelHandler extends BaseQueryHandler<GetFunnelQuery, FunnelResponseData>
  implements IQueryHandler<GetFunnelQuery> {
  readonly queryType = 'analytics.funnel.get';
  constructor(private readonly service: FunnelService) { super(); }
  async execute(query: GetFunnelQuery): Promise<FunnelResponseData> {
    const result = await this.service.findById(query.funnelId);
    if (!result) throw new ApplicationNotFoundError('Funnel', query.funnelId);
    return result;
  }
}
