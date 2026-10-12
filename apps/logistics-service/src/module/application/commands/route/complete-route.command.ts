import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteRouteRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class CompleteRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.complete';
  constructor(public readonly dto: CompleteRouteRequestDTO, public readonly actorId?: string) { super(); }
}
