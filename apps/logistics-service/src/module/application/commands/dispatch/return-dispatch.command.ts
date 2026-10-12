import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReturnDispatchRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class ReturnDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.mark_returned';
  constructor(public readonly dto: ReturnDispatchRequestDTO, public readonly actorId?: string) { super(); }
}
