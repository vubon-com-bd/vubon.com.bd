import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackingEtaCommand } from './update-tracking-eta.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '../../services/interfaces/tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking/tracking-response.dto.js';

@CommandHandler(UpdateTrackingEtaCommand)
export class UpdateTrackingEtaHandler implements ICommandHandler<UpdateTrackingEtaCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: UpdateTrackingEtaCommand): Promise<TrackingResponseDTO> { return this.service.updateEta(c.dto, c.actorId); }
}
