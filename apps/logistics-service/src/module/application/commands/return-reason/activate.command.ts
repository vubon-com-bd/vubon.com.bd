import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReturnReasonActionRequestDTO } from '@application/dtos/requests/return-reason/index.js';
export class ActivateReturnReasonCommand extends BaseCommand {
  readonly type = 'logistics.return_reason.activate';
  constructor(public readonly dto: ReturnReasonActionRequestDTO, public readonly actorId: string) { super(); }
}
