import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateWarehouseRequestDTO } from '../../dtos/requests/warehouse/warehouse.dto.js';
export class ActivateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.activate';
  constructor(public readonly dto: ActivateWarehouseRequestDTO, public readonly actorId?: string) { super(); }
}
