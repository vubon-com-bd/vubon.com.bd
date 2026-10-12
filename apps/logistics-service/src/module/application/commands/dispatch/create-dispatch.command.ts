import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateDispatchRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class CreateDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.create';
  constructor(public readonly dto: CreateDispatchRequestDTO, public readonly actorId?: string) { super(); }
}
