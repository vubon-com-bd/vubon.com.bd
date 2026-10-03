import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteReturnRequestDTO } from '../../dtos/requests/return/complete-return.dto.js';

export class CompleteReturnCommand extends BaseCommand {
  readonly type = 'return.complete';
  constructor(public readonly dto: CompleteReturnRequestDTO, public readonly actorId?: string) { super(); }
}
