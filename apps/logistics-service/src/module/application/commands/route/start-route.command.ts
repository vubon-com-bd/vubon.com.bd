import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartRouteRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class StartRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.start';
  constructor(public readonly dto: StartRouteRequestDTO, public readonly actorId?: string) { super(); }
}
