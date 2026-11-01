import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ExpireTrackingRequestDTO } from '@application/dtos/requests/tracking/index.js';
export class ExpireTrackingCommand extends BaseCommand {
  readonly type = 'logistics.tracking.expire';
  constructor(public readonly dto: ExpireTrackingRequestDTO, public readonly actorId: string) { super(); }
}
