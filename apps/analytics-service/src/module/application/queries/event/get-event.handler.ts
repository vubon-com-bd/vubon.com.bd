import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetEventQuery } from './get-event.query';
import type { EventRepository } from '../../../domain/repositories/event.repository.interface';
import { EventIdVO } from '../../../domain/value-objects/primitives/event-id.vo';
import { EventNotFoundError } from '../../../domain/errors/event.errors';
import {
  type EventResponseDTO,
  toEventResponse,
} from '../../dtos/responses';

@QueryHandler(GetEventQuery)
export class GetEventHandler
  extends BaseQueryHandler<GetEventQuery, EventResponseDTO>
  implements IQueryHandler<GetEventQuery>
{
  readonly queryType = 'analytics.event.get';

  constructor(private readonly eventRepo: EventRepository) {
    super();
  }

  async execute(query: GetEventQuery): Promise<EventResponseDTO> {
    const entity = await this.eventRepo.findById(EventIdVO.create(query.eventId));
    if (!entity) throw new EventNotFoundError(query.eventId);
    return toEventResponse(entity);
  }
}
