import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateTrackingCommand } from './create-tracking.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@CommandHandler(CreateTrackingCommand)
export class CreateTrackingHandler implements ICommandHandler<CreateTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: CreateTrackingCommand): Promise<TrackingResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
