import { EventService } from '../../services/impl/event.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListEventsQuery } from './list-events.query.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';

@Injectable()
@QueryHandler(ListEventsQuery)
export class ListEventsHandler extends BaseQueryHandler<ListEventsQuery, readonly EventResponseData[]>
  implements IQueryHandler<ListEventsQuery> {
  readonly queryType = 'analytics.event.list';
  constructor(private readonly service: EventService) { super(); }
  async execute(query: ListEventsQuery): Promise<readonly EventResponseData[]> {
    return this.service.list({
      sessionId: query.sessionId,
      userId: query.userId,
      limit: query.limit,
    });
  }
}
