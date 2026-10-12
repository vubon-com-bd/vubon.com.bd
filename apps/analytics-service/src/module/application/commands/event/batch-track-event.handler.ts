import { EventService } from '../../services/impl/event.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
/**
 * Batch Track Event Command Handler
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { BatchTrackEventCommand } from './batch-track-event.command.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';

@Injectable()
@CommandHandler(BatchTrackEventCommand)
export class BatchTrackEventHandler extends BaseCommandHandler<BatchTrackEventCommand, readonly EventResponseData[]>
  implements ICommandHandler<BatchTrackEventCommand> {
  readonly commandType = 'analytics.event.batch-track';

  constructor(private readonly eventService: EventService) {
    super();
  }

  async execute(command: BatchTrackEventCommand): Promise<readonly EventResponseData[]> {
    return this.eventService.trackBatch(command.payload.events, command.userId);
  }
}
