import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateTrackingCommand } from './activate-tracking.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@CommandHandler(ActivateTrackingCommand)
export class ActivateTrackingHandler implements ICommandHandler<ActivateTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: ActivateTrackingCommand): Promise<TrackingResponseDTO> {
    return this.service.activate(c.dto, c.actorId);
  }
}
