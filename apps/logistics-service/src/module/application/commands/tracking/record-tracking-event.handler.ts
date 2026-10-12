import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RecordTrackingEventCommand } from './record-tracking-event.command.js';
import { TRACKING_SERVICE, type ITrackingService } from '../../services/interfaces/tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking/tracking-response.dto.js';

@CommandHandler(RecordTrackingEventCommand)
export class RecordTrackingEventHandler implements ICommandHandler<RecordTrackingEventCommand, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(c: RecordTrackingEventCommand): Promise<TrackingResponseDTO> { return this.service.recordEvent(c.dto, c.actorId); }
}
