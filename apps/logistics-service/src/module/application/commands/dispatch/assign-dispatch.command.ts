import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignDispatchRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class AssignDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.assign';
  constructor(public readonly dto: AssignDispatchRequestDTO, public readonly actorId?: string) { super(); }
}
