import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RouteActionRequestDTO } from '@application/dtos/requests/route/index.js';
export class ArchiveRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.archive';
  constructor(public readonly dto: RouteActionRequestDTO, public readonly actorId: string) { super(); }
}
