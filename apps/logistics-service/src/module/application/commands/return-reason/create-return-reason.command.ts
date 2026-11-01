import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateReturnReasonRequestDTO } from '@application/dtos/requests/return-reason/index.js';
export class CreateReturnReasonCommand extends BaseCommand {
  readonly type = 'logistics.return_reason.create';
  constructor(public readonly dto: CreateReturnReasonRequestDTO, public readonly actorId: string) { super(); }
}
