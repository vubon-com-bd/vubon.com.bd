import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReorderRouteStopsRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class ReorderRouteStopsCommand extends BaseCommand {
  readonly type = 'logistics.route.reorder_stops';
  constructor(public readonly dto: ReorderRouteStopsRequestDTO, public readonly actorId?: string) { super(); }
}
