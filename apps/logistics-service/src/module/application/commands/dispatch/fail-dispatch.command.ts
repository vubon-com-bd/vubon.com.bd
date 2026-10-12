import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailDispatchRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class FailDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.fail';
  constructor(public readonly dto: FailDispatchRequestDTO, public readonly actorId?: string) { super(); }
}
