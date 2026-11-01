import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddTrackingEventRequestDTO } from '@application/dtos/requests/tracking/index.js';
export class AddTrackingEventCommand extends BaseCommand {
  readonly type = 'logistics.tracking.add_event';
  constructor(public readonly dto: AddTrackingEventRequestDTO, public readonly actorId: string) { super(); }
}
