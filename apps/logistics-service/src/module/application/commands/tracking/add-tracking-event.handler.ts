import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddTrackingEventCommand } from './add-tracking-event.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@CommandHandler(AddTrackingEventCommand)
export class AddTrackingEventHandler implements ICommandHandler<AddTrackingEventCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: AddTrackingEventCommand): Promise<TrackingResponseDTO> {
    return this.service.addEvent(c.dto, c.actorId);
  }
}
