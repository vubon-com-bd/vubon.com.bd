/**
 * Track Event Command
 * @module analytics-service/application/commands/event
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { TrackEventDto } from '../../dtos/requests/event/track-event.dto.js';

export class TrackEventCommand extends BaseCommand {
  readonly type = 'analytics.event.track';

  constructor(
    public readonly payload: TrackEventDto,
    public readonly userId?: string
  ) {
    super();
  }
}
