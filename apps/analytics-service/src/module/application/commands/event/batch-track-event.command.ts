import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { TrackEventDTO } from '../../dtos/requests/event';

export class BatchTrackEventCommand extends BaseCommand {
  readonly type = 'analytics.event.batch-track';

  constructor(public readonly events: readonly TrackEventDTO[]) {
    super();
  }
}
