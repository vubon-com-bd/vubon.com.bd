import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateTrackingEtaRequestDTO } from '../../dtos/requests/tracking/tracking.dto.js';
export class UpdateTrackingEtaCommand extends BaseCommand {
  readonly type = 'logistics.tracking.update_eta';
  constructor(public readonly dto: UpdateTrackingEtaRequestDTO, public readonly actorId?: string) { super(); }
}
