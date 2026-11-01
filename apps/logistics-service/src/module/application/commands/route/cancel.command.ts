import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelRouteRequestDTO } from '@application/dtos/requests/route/index.js';
export class CancelRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.cancel';
  constructor(public readonly dto: CancelRouteRequestDTO, public readonly actorId: string) { super(); }
}
