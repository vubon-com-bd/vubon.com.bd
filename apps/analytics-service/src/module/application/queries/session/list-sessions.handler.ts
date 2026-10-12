import { SessionService } from '../../services/impl/session.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListSessionsQuery } from './list-sessions.query.js';
import type { SessionResponseData } from '../../dtos/responses/session-response.dto.js';

@Injectable()
@QueryHandler(ListSessionsQuery)
export class ListSessionsHandler extends BaseQueryHandler<ListSessionsQuery, readonly SessionResponseData[]>
  implements IQueryHandler<ListSessionsQuery> {
  readonly queryType = 'analytics.session.list';
  constructor(private readonly service: SessionService) { super(); }
  async execute(query: ListSessionsQuery): Promise<readonly SessionResponseData[]> {
    return this.service.findByUser(query.userId);
  }
}
