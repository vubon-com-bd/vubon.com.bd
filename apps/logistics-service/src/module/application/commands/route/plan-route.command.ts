import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PlanRouteRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class PlanRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.plan';
  constructor(public readonly dto: PlanRouteRequestDTO, public readonly actorId?: string) { super(); }
}
