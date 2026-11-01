import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RouteActionRequestDTO } from '@application/dtos/requests/route/index.js';
export class CompleteRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.complete';
  constructor(public readonly dto: RouteActionRequestDTO, public readonly actorId: string) { super(); }
}
