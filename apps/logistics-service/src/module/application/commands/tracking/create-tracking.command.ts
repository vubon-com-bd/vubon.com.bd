import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateTrackingRequestDTO } from '@application/dtos/requests/tracking/index.js';
export class CreateTrackingCommand extends BaseCommand {
  readonly type = 'logistics.tracking.create';
  constructor(public readonly dto: CreateTrackingRequestDTO, public readonly actorId: string) { super(); }
}
