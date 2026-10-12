import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartTrackingRequestDTO } from '../../dtos/requests/tracking/tracking.dto.js';
export class StartTrackingCommand extends BaseCommand {
  readonly type = 'logistics.tracking.start';
  constructor(public readonly dto: StartTrackingRequestDTO, public readonly actorId?: string) { super(); }
}
