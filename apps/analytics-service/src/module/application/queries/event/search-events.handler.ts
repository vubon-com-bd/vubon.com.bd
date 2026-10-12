import { EventService } from '../../services/impl/event.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { SearchEventsQuery } from './search-events.query.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';

@Injectable()
@QueryHandler(SearchEventsQuery)
export class SearchEventsHandler extends BaseQueryHandler<SearchEventsQuery, readonly EventResponseData[]>
  implements IQueryHandler<SearchEventsQuery> {
  readonly queryType = 'analytics.event.search';
  constructor(private readonly service: EventService) { super(); }
  async execute(query: SearchEventsQuery): Promise<readonly EventResponseData[]> {
    return this.service.list({ limit: query.limit });
  }
}
