import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ExpireTrackingCommand } from './expire-tracking.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@CommandHandler(ExpireTrackingCommand)
export class ExpireTrackingHandler implements ICommandHandler<ExpireTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: ExpireTrackingCommand): Promise<TrackingResponseDTO> {
    return this.service.expire(c.dto, c.actorId);
  }
}
