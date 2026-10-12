import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveRouteStopRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class RemoveRouteStopCommand extends BaseCommand {
  readonly type = 'logistics.route.remove_stop';
  constructor(public readonly dto: RemoveRouteStopRequestDTO, public readonly actorId?: string) { super(); }
}
