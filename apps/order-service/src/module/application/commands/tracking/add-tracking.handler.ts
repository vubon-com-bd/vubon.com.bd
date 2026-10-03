import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddTrackingCommand } from './add-tracking.command.js';
import { ORDER_TRACKING_SERVICE, type IOrderTrackingService } from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@CommandHandler(AddTrackingCommand)
export class AddTrackingHandler implements ICommandHandler<AddTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(ORDER_TRACKING_SERVICE) private readonly service: IOrderTrackingService) {}
  async execute(c: AddTrackingCommand): Promise<TrackingResponseDTO> {
    return this.service.add(c.dto, c.actorId);
  }
}
