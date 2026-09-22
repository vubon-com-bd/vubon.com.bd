import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddTrackingCommand } from './add-tracking.command';
import type { TrackingServiceInterface } from '../../services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

@CommandHandler(AddTrackingCommand)
export class AddTrackingHandler
  extends BaseCommandHandler<AddTrackingCommand, TrackingResponseDTO>
  implements ICommandHandler<AddTrackingCommand>
{
  readonly commandType = 'tracking.add';

  constructor(
    private readonly trackingService: TrackingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddTrackingCommand): Promise<TrackingResponseDTO> {
    return this.trackingService.add(
      command.orderId,
      command.trackingNumber,
      command.carrier,
    );
  }
}
