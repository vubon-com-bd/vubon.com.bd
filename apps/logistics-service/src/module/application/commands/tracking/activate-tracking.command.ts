import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateTrackingRequestDTO } from '@application/dtos/requests/tracking/index.js';
export class ActivateTrackingCommand extends BaseCommand {
  readonly type = 'logistics.tracking.activate';
  constructor(public readonly dto: ActivateTrackingRequestDTO, public readonly actorId: string) { super(); }
}
