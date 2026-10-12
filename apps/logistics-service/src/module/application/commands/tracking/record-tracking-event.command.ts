import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RecordTrackingEventRequestDTO } from '../../dtos/requests/tracking/tracking.dto.js';
export class RecordTrackingEventCommand extends BaseCommand {
  readonly type = 'logistics.tracking.record_event';
  constructor(public readonly dto: RecordTrackingEventRequestDTO, public readonly actorId?: string) { super(); }
}
