import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelRouteRequestDTO } from '../../dtos/requests/route/route.dto.js';
export class CancelRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.cancel';
  constructor(public readonly dto: CancelRouteRequestDTO, public readonly actorId?: string) { super(); }
}
