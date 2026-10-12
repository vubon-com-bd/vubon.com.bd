import { EventService } from '../../services/impl/event.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Process Event Command Handler
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { ProcessEventCommand } from './process-event.command.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';

@Injectable()
@CommandHandler(ProcessEventCommand)
export class ProcessEventHandler extends BaseCommandHandler<ProcessEventCommand, EventResponseData>
  implements ICommandHandler<ProcessEventCommand> {
  readonly commandType = 'analytics.event.process';

  constructor(private readonly eventService: EventService) {
    super();
  }

  async execute(command: ProcessEventCommand): Promise<EventResponseData> {
    return this.eventService.process(command.eventId);
  }
}
