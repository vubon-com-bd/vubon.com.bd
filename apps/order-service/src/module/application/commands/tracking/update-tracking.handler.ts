import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackingCommand } from './update-tracking.command.js';
import { ORDER_TRACKING_SERVICE, type IOrderTrackingService } from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@CommandHandler(UpdateTrackingCommand)
export class UpdateTrackingHandler implements ICommandHandler<UpdateTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(ORDER_TRACKING_SERVICE) private readonly service: IOrderTrackingService) {}
  async execute(c: UpdateTrackingCommand): Promise<TrackingResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
