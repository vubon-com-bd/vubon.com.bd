import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateDispatchEtaRequestDTO } from '../../dtos/requests/dispatch/dispatch.dto.js';
export class UpdateDispatchEtaCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.update_eta';
  constructor(public readonly dto: UpdateDispatchEtaRequestDTO, public readonly actorId?: string) { super(); }
}
