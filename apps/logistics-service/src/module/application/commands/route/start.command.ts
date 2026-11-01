import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartRouteRequestDTO } from '@application/dtos/requests/route/index.js';
export class StartRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.start';
  constructor(public readonly dto: StartRouteRequestDTO, public readonly actorId: string) { super(); }
}
