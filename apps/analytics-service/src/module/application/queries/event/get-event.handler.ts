import { EventService } from '../../services/impl/event.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetEventQuery } from './get-event.query.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';

@Injectable()
@QueryHandler(GetEventQuery)
export class GetEventHandler extends BaseQueryHandler<GetEventQuery, EventResponseData>
  implements IQueryHandler<GetEventQuery> {
  readonly queryType = 'analytics.event.get';
  constructor(private readonly service: EventService) { super(); }
  async execute(query: GetEventQuery): Promise<EventResponseData> {
    const result = await this.service.findById(query.eventId);
    if (!result) throw new ApplicationNotFoundError('Event', query.eventId);
    return result;
  }
}
