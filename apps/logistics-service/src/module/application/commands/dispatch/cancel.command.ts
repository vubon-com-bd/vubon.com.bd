import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelDispatchRequestDTO } from '@application/dtos/requests/dispatch/index.js';
export class CancelDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.cancel';
  constructor(public readonly dto: CancelDispatchRequestDTO, public readonly actorId: string) { super(); }
}
