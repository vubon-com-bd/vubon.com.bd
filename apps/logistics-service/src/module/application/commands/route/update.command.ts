import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateRouteRequestDTO } from '@application/dtos/requests/route/index.js';
export class UpdateRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.update';
  constructor(public readonly dto: UpdateRouteRequestDTO, public readonly actorId: string) { super(); }
}
