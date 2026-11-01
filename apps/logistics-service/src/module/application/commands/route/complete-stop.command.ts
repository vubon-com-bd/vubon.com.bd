import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteStopRequestDTO } from '@application/dtos/requests/route/index.js';
export class CompleteStopRouteCommand extends BaseCommand {
  readonly type = 'logistics.route.complete_stop';
  constructor(public readonly dto: CompleteStopRequestDTO, public readonly actorId: string) { super(); }
}
