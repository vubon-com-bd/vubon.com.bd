import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrackEventCommand } from './track-event.command';
import type { EventServiceInterface } from '../../services/interfaces/event.service.interface';
import type { EventResponseDTO } from '../../dtos/responses';

@CommandHandler(TrackEventCommand)
export class TrackEventHandler
  extends BaseCommandHandler<TrackEventCommand, EventResponseDTO>
  implements ICommandHandler<TrackEventCommand>
{
  readonly commandType = 'analytics.event.track';

  constructor(private readonly eventService: EventServiceInterface) {
    super();
  }

  async execute(command: TrackEventCommand): Promise<EventResponseDTO> {
    return this.eventService.trackEvent({
      name: command.name,
      source: command.source,
      userId: command.userId,
      sessionId: command.sessionId,
      occurredAt: command.occurredAt,
      payload: command.payload,
    });
  }
}
