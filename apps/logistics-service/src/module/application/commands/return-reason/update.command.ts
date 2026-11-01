import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateReturnReasonRequestDTO } from '@application/dtos/requests/return-reason/index.js';
export class UpdateReturnReasonCommand extends BaseCommand {
  readonly type = 'logistics.return_reason.update';
  constructor(public readonly dto: UpdateReturnReasonRequestDTO, public readonly actorId: string) { super(); }
}
