import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateTrackingRequestDTO } from '../../dtos/requests/tracking/update-tracking.dto.js';

export class UpdateTrackingCommand extends BaseCommand {
  readonly type = 'tracking.update';
  constructor(public readonly dto: UpdateTrackingRequestDTO, public readonly actorId?: string) { super(); }
}
