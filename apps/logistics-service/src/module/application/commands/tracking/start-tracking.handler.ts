import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartTrackingCommand } from './start-tracking.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '../../services/interfaces/tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking/tracking-response.dto.js';

@CommandHandler(StartTrackingCommand)
export class StartTrackingHandler implements ICommandHandler<StartTrackingCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: StartTrackingCommand): Promise<TrackingResponseDTO> { return this.service.start(c.dto, c.actorId); }
}
