import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignWarehouseRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class AssignWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.shipment.assign_warehouse';
  constructor(public readonly dto: AssignWarehouseRequestDTO, public readonly actorId?: string) { super(); }
}
