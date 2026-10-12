import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteRouteStopRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class CompleteRouteStopCommand extends BaseCommand {
  readonly type = 'logistics.route.complete_stop';
  constructor(public readonly dto: CompleteRouteStopRequestDTO, public readonly actorId?: string) { super(); }
}
