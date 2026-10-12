import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateWarehouseRequestDTO } from '../../dtos/requests/warehouse/warehouse.dto.js';
export class UpdateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.update';
  constructor(public readonly dto: UpdateWarehouseRequestDTO, public readonly actorId?: string) { super(); }
}
