import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailTrackingCommand } from './fail-tracking.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@CommandHandler(FailTrackingCommand)
export class FailTrackingHandler implements ICommandHandler<FailTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: FailTrackingCommand): Promise<TrackingResponseDTO> {
    return this.service.fail(c.dto, c.actorId);
  }
}
