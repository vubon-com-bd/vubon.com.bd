import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RouteActionRequestDTO } from '@application/dtos/requests/route/index.js';
export class PlanRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.plan';
  constructor(public readonly dto: RouteActionRequestDTO, public readonly actorId: string) { super(); }
}
