import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveReturnRequestDTO } from '../../dtos/requests/return/approve-return.dto.js';

export class ApproveReturnCommand extends BaseCommand {
  readonly type = 'return.approve';
  constructor(public readonly dto: ApproveReturnRequestDTO, public readonly actorId?: string) { super(); }
}
