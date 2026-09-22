import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTrackingCommand } from './update-tracking.command';
import type { TrackingServiceInterface } from '../../services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

@CommandHandler(UpdateTrackingCommand)
export class UpdateTrackingHandler
  extends BaseCommandHandler<UpdateTrackingCommand, TrackingResponseDTO>
  implements ICommandHandler<UpdateTrackingCommand>
{
  readonly commandType = 'tracking.update';

  constructor(
    private readonly trackingService: TrackingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateTrackingCommand): Promise<TrackingResponseDTO> {
    return this.trackingService.update(command.trackingId, command.status);
  }
}
