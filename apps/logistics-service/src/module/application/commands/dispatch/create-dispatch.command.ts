import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateDispatchRequestDTO } from '@application/dtos/requests/dispatch/index.js';
export class CreateDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.create';
  constructor(public readonly dto: CreateDispatchRequestDTO, public readonly actorId: string) { super(); }
}
