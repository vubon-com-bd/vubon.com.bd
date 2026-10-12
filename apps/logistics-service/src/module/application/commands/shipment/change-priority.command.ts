import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ChangePriorityRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class ChangePriorityCommand extends BaseCommand {
  readonly type = 'logistics.shipment.change_priority';
  constructor(public readonly dto: ChangePriorityRequestDTO, public readonly actorId?: string) { super(); }
}
