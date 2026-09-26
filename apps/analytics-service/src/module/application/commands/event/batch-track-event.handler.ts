import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { BatchTrackEventCommand } from './batch-track-event.command';
import type { EventServiceInterface } from '../../services/interfaces/event.service.interface';
import type { EventResponseDTO } from '../../dtos/responses';

@CommandHandler(BatchTrackEventCommand)
export class BatchTrackEventHandler
  extends BaseCommandHandler<BatchTrackEventCommand, readonly EventResponseDTO[]>
  implements ICommandHandler<BatchTrackEventCommand>
{
  readonly commandType = 'analytics.event.batch-track';

  constructor(private readonly eventService: EventServiceInterface) {
    super();
  }

  async execute(
    command: BatchTrackEventCommand,
  ): Promise<readonly EventResponseDTO[]> {
    return this.eventService.trackBatch({ events: [...command.events] });
  }
}
