/**
 * UpdateTrackingHandler
 * @module order-service/application/commands/tracking
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackingCommand } from './update-tracking.command.js';
import {
  ORDER_TRACKING_SERVICE,
  type IOrderTrackingService,
} from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingEntryResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@CommandHandler(UpdateTrackingCommand)
export class UpdateTrackingHandler
  implements ICommandHandler<UpdateTrackingCommand, TrackingEntryResponseDTO>
{
  constructor(
    @Inject(ORDER_TRACKING_SERVICE)
    private readonly service: IOrderTrackingService,
  ) {}

  async execute(c: UpdateTrackingCommand): Promise<TrackingEntryResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
