import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddTrackingRequestDTO } from '../../dtos/requests/tracking/add-tracking.dto.js';

export class AddTrackingCommand extends BaseCommand {
  readonly type = 'tracking.add';
  constructor(public readonly dto: AddTrackingRequestDTO, public readonly actorId?: string) { super(); }
}
