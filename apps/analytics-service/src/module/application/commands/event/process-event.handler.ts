import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ProcessEventCommand } from './process-event.command';
import type { EventServiceInterface } from '../../services/interfaces/event.service.interface';

@CommandHandler(ProcessEventCommand)
export class ProcessEventHandler
  extends BaseCommandHandler<ProcessEventCommand, void>
  implements ICommandHandler<ProcessEventCommand>
{
  readonly commandType = 'analytics.event.process';

  constructor(private readonly eventService: EventServiceInterface) {
    super();
  }

  async execute(command: ProcessEventCommand): Promise<void> {
    await this.eventService.markProcessed(command.eventId);
  }
}
