import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveTrackingCommand } from './remove-tracking.command';
import type { TrackingServiceInterface } from '../../services/interfaces/tracking.service.interface';

@CommandHandler(RemoveTrackingCommand)
export class RemoveTrackingHandler
  extends BaseCommandHandler<RemoveTrackingCommand, void>
  implements ICommandHandler<RemoveTrackingCommand>
{
  readonly commandType = 'tracking.remove';

  constructor(
    private readonly trackingService: TrackingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveTrackingCommand): Promise<void> {
    await this.trackingService.remove(command.trackingId);
  }
}
