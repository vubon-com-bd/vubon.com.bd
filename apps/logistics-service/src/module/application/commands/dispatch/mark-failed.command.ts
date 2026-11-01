import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailDispatchRequestDTO } from '@application/dtos/requests/dispatch/index.js';
export class MarkFailedDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.mark_failed';
  constructor(public readonly dto: FailDispatchRequestDTO, public readonly actorId: string) { super(); }
}
