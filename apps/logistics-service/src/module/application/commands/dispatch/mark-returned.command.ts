import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReturnDispatchRequestDTO } from '@application/dtos/requests/dispatch/index.js';
export class MarkReturnedDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.mark_returned';
  constructor(public readonly dto: ReturnDispatchRequestDTO, public readonly actorId: string) { super(); }
}
