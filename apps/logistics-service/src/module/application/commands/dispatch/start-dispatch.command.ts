import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartDispatchRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class StartDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.start';
  constructor(public readonly dto: StartDispatchRequestDTO, public readonly actorId?: string) { super(); }
}
