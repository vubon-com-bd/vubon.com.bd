import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkDispatchInTransitRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class MarkDispatchInTransitCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.mark_in_transit';
  constructor(public readonly dto: MarkDispatchInTransitRequestDTO, public readonly actorId?: string) { super(); }
}
