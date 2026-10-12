import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteDispatchRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class CompleteDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.complete';
  constructor(public readonly dto: CompleteDispatchRequestDTO, public readonly actorId?: string) { super(); }
}
