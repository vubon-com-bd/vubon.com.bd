/**
 * Batch Track Event Command
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { BatchTrackEventDto } from '../../dtos/requests/event/batch-track-event.dto.js';

export class BatchTrackEventCommand extends BaseCommand {
  readonly type = 'analytics.event.batch-track';

  constructor(
    public readonly payload: BatchTrackEventDto,
    public readonly userId?: string
  ) {
    super();
  }
}
