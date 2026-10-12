import { EventService } from '../../services/impl/event.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Track Event Command Handler
 * @module analytics-service/application/commands/event
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { TrackEventCommand } from './track-event.command.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';

@Injectable()
@CommandHandler(TrackEventCommand)
export class TrackEventHandler extends BaseCommandHandler<TrackEventCommand, EventResponseData>
  implements ICommandHandler<TrackEventCommand> {
  readonly commandType = 'analytics.event.track';

  constructor(private readonly eventService: EventService) {
    super();
  }

  async execute(command: TrackEventCommand): Promise<EventResponseData> {
    return this.eventService.track(command.payload, command.userId);
  }
}
