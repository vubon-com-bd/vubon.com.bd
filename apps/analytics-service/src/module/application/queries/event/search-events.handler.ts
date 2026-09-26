import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { SearchEventsQuery } from './search-events.query';
import type { EventRepository } from '../../../domain/repositories/event.repository.interface';
import { EventNameVO } from '../../../domain/value-objects/primitives/event-name.vo';
import {
  type EventResponseDTO,
  toEventResponse,
} from '../../dtos/responses';

@QueryHandler(SearchEventsQuery)
export class SearchEventsHandler
  extends BaseQueryHandler<SearchEventsQuery, readonly EventResponseDTO[]>
  implements IQueryHandler<SearchEventsQuery>
{
  readonly queryType = 'analytics.event.search';

  constructor(private readonly eventRepo: EventRepository) {
    super();
  }

  async execute(query: SearchEventsQuery): Promise<readonly EventResponseDTO[]> {
    const entities = await this.eventRepo.findByName(EventNameVO.create(query.name));
    return entities.slice(0, query.limit).map((e) => toEventResponse(e));
  }
}
