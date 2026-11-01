import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DispatchActionRequestDTO } from '@application/dtos/requests/dispatch/index.js';
export class MarkDeliveredDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.mark_delivered';
  constructor(public readonly dto: DispatchActionRequestDTO, public readonly actorId: string) { super(); }
}
