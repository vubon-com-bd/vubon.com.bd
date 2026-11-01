import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DispatchActionRequestDTO } from '@application/dtos/requests/dispatch/index.js';
export class StartTransitDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.start_transit';
  constructor(public readonly dto: DispatchActionRequestDTO, public readonly actorId: string) { super(); }
}
