import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteTrackingRequestDTO } from '@application/dtos/requests/tracking/index.js';
export class CompleteTrackingCommand extends BaseCommand {
  readonly type = 'logistics.tracking.complete';
  constructor(public readonly dto: CompleteTrackingRequestDTO, public readonly actorId: string) { super(); }
}
