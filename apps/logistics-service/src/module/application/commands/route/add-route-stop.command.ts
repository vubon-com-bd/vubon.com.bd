import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddRouteStopRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class AddRouteStopCommand extends BaseCommand {
  readonly type = 'logistics.route.add_stop';
  constructor(public readonly dto: AddRouteStopRequestDTO, public readonly actorId?: string) { super(); }
}
