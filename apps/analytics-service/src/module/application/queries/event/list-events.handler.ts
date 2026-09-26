import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListEventsQuery } from './list-events.query';
import type { EventRepository } from '../../../domain/repositories/event.repository.interface';
import { EventSourceVO } from '../../../domain/value-objects/primitives/event-source.vo';
import {
  type EventResponseDTO,
  toEventResponse,
} from '../../dtos/responses';

@QueryHandler(ListEventsQuery)
export class ListEventsHandler
  extends BaseQueryHandler<ListEventsQuery, readonly EventResponseDTO[]>
  implements IQueryHandler<ListEventsQuery>
{
  readonly queryType = 'analytics.event.list';

  constructor(private readonly eventRepo: EventRepository) {
    super();
  }

  async execute(query: ListEventsQuery): Promise<readonly EventResponseDTO[]> {
    let entities;
    if (query.source) {
      entities = await this.eventRepo.findBySource(EventSourceVO.create(query.source));
    } else {
      entities = await this.eventRepo.findAll();
    }
    const slice = entities.slice(query.offset, query.offset + query.limit);
    return slice.map((e) => toEventResponse(e));
  }
}
