import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailTrackingRequestDTO } from '@application/dtos/requests/tracking/index.js';
export class FailTrackingCommand extends BaseCommand {
  readonly type = 'logistics.tracking.fail';
  constructor(public readonly dto: FailTrackingRequestDTO, public readonly actorId: string) { super(); }
}
