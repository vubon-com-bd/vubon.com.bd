import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateRouteRequestDTO } from '@application/dtos/requests/route/index.js';
export class CreateRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.create';
  constructor(public readonly dto: CreateRouteRequestDTO, public readonly actorId: string) { super(); }
}
