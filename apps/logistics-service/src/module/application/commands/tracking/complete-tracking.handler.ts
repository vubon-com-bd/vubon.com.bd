import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteTrackingCommand } from './complete-tracking.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@CommandHandler(CompleteTrackingCommand)
export class CompleteTrackingHandler implements ICommandHandler<CompleteTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: CompleteTrackingCommand): Promise<TrackingResponseDTO> {
    return this.service.complete(c.dto, c.actorId);
  }
}
