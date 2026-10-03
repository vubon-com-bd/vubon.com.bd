import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectReturnRequestDTO } from '../../dtos/requests/return/reject-return.dto.js';

export class RejectReturnCommand extends BaseCommand {
  readonly type = 'return.reject';
  constructor(public readonly dto: RejectReturnRequestDTO, public readonly actorId?: string) { super(); }
}
