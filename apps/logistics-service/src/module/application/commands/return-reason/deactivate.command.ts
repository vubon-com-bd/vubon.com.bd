import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateReturnReasonRequestDTO } from '@application/dtos/requests/return-reason/index.js';
export class DeactivateReturnReasonCommand extends BaseCommand {
  readonly type = 'logistics.return_reason.deactivate';
  constructor(public readonly dto: DeactivateReturnReasonRequestDTO, public readonly actorId: string) { super(); }
}
