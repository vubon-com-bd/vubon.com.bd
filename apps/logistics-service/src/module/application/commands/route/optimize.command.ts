import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { OptimizeRouteRequestDTO } from '@application/dtos/requests/route/index.js';
export class OptimizeRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.optimize';
  constructor(public readonly dto: OptimizeRouteRequestDTO, public readonly actorId: string) { super(); }
}
